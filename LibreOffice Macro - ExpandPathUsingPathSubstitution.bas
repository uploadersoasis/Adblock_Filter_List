Option Explicit  ' forces the explicit declaration of all variables used within this module; required to be here before any subroutine or functions definitions.
Option VBASupport 0
'Option VBASupport 1  ' use if Err is to be an object not the native function.

' These global constants cannot be overridden in subroutines and functions by local variables.
' Constants will not show their values in the IDE debugger in the "watch" list.
Const BackSlash = "\"  ' used to find in sFilePath to be replaced with forward slash; the backslash must NOT be escaped.
Const ForwardSlash = "/"  ' use forward slash for the separator between sFilePath and sFileName if needed
Const Period = "."  ' used as the separator between sFileName and sFileExtension


Public Function ExpandPathUsingPathSubstitution(sFilePath As String) As String
'  No error will be generated if sFilePath doesn't actually contain any environment variables.
	On Error GoTo ErrorHandler ' Enable error handling for service creation and SupportsService check; "Resume Next" allows continuation is service creation fails.

	sFilePath = LTrim(sFilePath) ' Removes leading spaces
	' TODO:  Don't actually remove trailing spaces as they could be valid especially for paths?
	'sFilePath = RTrim(sFilePath) ' Removes trailing spaces

AlternativeParsing:  ' Used for parsing sFilePath's which begin with an environment variable contained in parentheses.
	Dim sEnvVarName As String ' Variable to store the extracted environment variable name
	Dim iFirstPercent As Integer ' Position of the first "%" character
	Dim iSecondPercent As Integer ' Position of the second "%" character
	' Check if the string starts with "%"
	If Left(sFilePath, 1) = "%" Then  ' check if alternative parsing is needed
		' Find the position of the second "%" character
		iFirstPercent = 1  ' pointless variable since it is always 1 using Left().
		iSecondPercent = InStr(iFirstPercent + 1, sFilePath, "%") ' Use InStr function to find the second "%" starting the search from the second position, but position returned is still an absolute position, i.e. includes the first character of the string.
		If iSecondPercent > 0 Then  ' if a second "%" was found
			' Mid(string, start position, length): Extracts a substring of a specified length starting from a given start position. 
			sEnvVarName = Mid(sFilePath, iFirstPercent + 1, iSecondPercent - iFirstPercent - 1) ' Extract the extract the environment variable name between the two "%"
			sFilePath = Right(sFilePath, Len(sFilePath) - iSecondPercent) ' Set the remaining part of the string to sFilePath
			' Don't prepend "file:///" to the path because it will cause an error, "Endless recursion detected. Cannot substitute variables!", when input into oPathSubstitution.substituteVariables(). 
			'sExpandedPath =  "file:///" & Environ(sEnvVarName) & sFilePath  ' Expand the environment variable and prepend it to the path
			'sFilePath = "file:///" & Environ(sEnvVarName) & sFilePath  ' Expand the environment variable and prepend it to the path
			sFilePath = Environ(sEnvVarName) & sFilePath  ' Expand the environment variable and prepend it to the path
			' This expanded sFilePath will next be fed into oPathSubstitutioninto substituteVariables() to parse any "$(<variable>)" strings contained in it.
			' This can cause "Endless recursion detected. Cannot substitute variables!" errors if sFilePath already contains as path that si the same as the $(variable) to be expanded.
		End If
	End If

	Dim oPathSubstitution As Object  ' sets value to Null
	Set oPathSubstitution = CreateUnoService("com.sun.star.util.PathSubstitution")  ' attempts to create an instance of the PathSubstitution service.
	' Check if the service was successfully created and supports the desired functionality
	' Do NOT use  "If Not IoPathSubstitution) Is Nothing" to check oPathSubstitution because "Not" cannot be used with "Is Nothing" as it will always trigger an "Object variable not set" runtime error if the object is Null/Nothing and a "Incorrect property value" runtime error if the object is not (or is an UNO service).
	' If Not IsNull(oPathSubstitution) causes a runtime error number 13, "Data type mismatch" occurs in the following IF statement even when oPathSubstitution is not Null.
	'If Not IsNull(oPathSubstitution) And oPathSubstitution.SupportsService("com.sun.star.util.PathSubstitution") Then  ' Not isNull() works because oPathSubstitution is implicitly set to Null upon declaration, i.e. Dim oPathSubstitution As Object. 
	If oPathSubstitution Is Nothing Or isNull(oPathSubstitution) Then  ' using this since "Not" versions of these comparisons combined with the following If statement generate errors
		GoTo ExitDoor
	ElseIf oPathSubstitution.SupportsService("com.sun.star.util.PathSubstitution") Then
		'  oPathSubstitution.substituteVariables() will NOT expand standard environment variables surrounded by parentheses, e.g. %TEMP%.
		'  oPathSubstitution.substituteVariables() only expands variables in "$(<variable>)" syntax, and only those of a predefined set which includes the following:  $(temp), $(home), $(work), and $(username).
		' See https://api.libreoffice.org/docs/idl/ref/servicecom_1_1sun_1_1star_1_1util_1_1PathSubstitution.html for the complete list of substituted variables and their definitions.
		' A "Object variable not set" runtime error results if oPathSubstitution is still its initial Null value because the service name is wrong.
		' substituteVariables() requires two arguments not just one.
		' oPathSubstitution.substituteVariables() will prepend "file:///" to the path output if variables are expanded in the operation, as it is required for use in file access.
		'Dim sExpandedPath As String  ' holds the modified path and will be returned if successful; not needed because can reuse sFilePath
		' If sFilePath includes a leading "file:///", this will cause a runtime error in oPathSubstitution.substituteVariables(): Error Number: 1, com.sun.star.container.NoSuchElementException, Endless recursion detected. Cannot substitute variables!.
		'sExpandedPath = oPathSubstitution.substituteVariables(sFilePath, True)  ' Expand the environment variable(s) in the path using the service; substituteVariables() is inherited from XStringSubstitution
		sFilePath = oPathSubstitution.substituteVariables(sFilePath, True)  ' Expand the environment variable(s) in the path using the service; substituteVariables() is inherited from XStringSubstitution
	End If
	' If the service was not available or doesn't support the expected interface, sFilePath was not (further) modified.

	GoTo ExitDoor  ' goes here on error of If statement.

ErrorHandler:
If Err Then
	' & means append to this string
	' _ means append the next line to this string
	' Chr(10) is the line feed character and is the cross-platform way to perform a new line in the MsgBox on Linux and Windows.
    MsgBox "An error occurred: " & _
     "Error Number: " & Err() & Chr(10) & _
     "Description: " & Error$() & Chr(10) & _
     "Line Number: " & Erl & Chr(10) , _
     16, "Error"  REM 16 is the Critical Message icon.
	Resume Next  ' clears the error and continues	
EndIf

ExitDoor:
	' sFIlePath will not have "file:///": prepended to it if sFIlePath did not have expandable variables and if oPathSubstitution.substituteVariables() was not successfully used on it.
	If Left(sFIlePath, 8) <> "file:///" And Left(sFIlePath, 1) <> "%" Then
		sFilePath = "file:///" & sFilePath
	End If

	' Using a Constant for ForwardSlash instead of a local variable;
	'Dim ForwardSlash As String : ForwardSlash = "/"  ' use forward slash for the separator between sFilePath and sFileName if needed
	' Using a Constant for backSlash instead of a local variable
	'Dim BackSlash As String : BackSlash = "\"  ' used to find in sFilePath to be replaced with forward slash; the backslash must NOT be escaped.
    'sFilePath = Replace(sFilePath, BackSlash, ForwardSlash)  ' Replace backslashes with forward slashes since the backslash is not valid for the filepath in LibreBASIC even on Windows.
    sFilePath = Replace(sFilePath, "\", "/")  ' Replace backslashes with forward slashes since the backslash is not valid for the filepath in LibreBASIC even on Windows.

	' IIf() is a function that takes a condition, a value to return if the condition is true, and a value to return if the condition is false. 
	' IIf() does NOT support negative comparisons, e.g. "Not" or "!=".  A "parentheses do not match" syntax error will result.
	'ExpandPathUsingPathSubstitution = IIf(IsEmpty(sExpandedPath), sFilePath, sExpandedPath)  ' Return the expanded path if it exists otherwise use the original input path
	ExpandPathUsingPathSubstitution = sFilePath  ' Returns the path whether expanded or not;
	MsgBox "The file path is now: " & ExpandPathUsingPathSubstitution , 64, "Results"  REM 64 is MB_ICONINFORMATION
	'MsgBox "The file path is now: " & sFilePath , 64, "Results"  REM 64 is MB_ICONINFORMATION; same output as the previous statement
	Exit Function  ' necessary to continue execution in the calling procedure
End Function


Sub TestPaths()
	ExpandPathUsingPathSubstitution("%TEMP%\$(username)\")
	ExpandPathUsingPathSubstitution("$(temp)\$(username)\")
	ExpandPathUsingPathSubstitution("$(work)")
	ExpandPathUsingPathSubstitution("$(home)")
End Sub