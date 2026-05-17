Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)

' Check if node_modules folder exists
If Not fso.FolderExists(scriptDir & "\node_modules") Then
    ' First run: Boot launch.bat in a VISIBLE console window so they see progress
    shell.Run "cmd.exe /c """ & scriptDir & "\launch.bat""", 1, True
Else
    ' Subsequent runs: Boot silently in the background instantly
    shell.Run "cmd.exe /c """ & scriptDir & "\launch.bat""", 0, False
End If
