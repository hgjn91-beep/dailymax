Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)

' 1. Resolve Desktop Special Folder dynamically (handles OneDrive, Local & Custom Paths!)
desktop = shell.SpecialFolders("Desktop")

' 2. Create the Desktop Shortcut pointing to wscript.exe
Set shortcut = shell.CreateShortcut(desktop & "\DailyMax.lnk")
shortcut.TargetPath = "C:\Windows\System32\wscript.exe"
shortcut.Arguments = """" & scriptDir & "\silent_launch.vbs"""
shortcut.WorkingDirectory = scriptDir
shortcut.IconLocation = scriptDir & "\public\icon.ico"
shortcut.Description = "DailyMax Prayer-Blocked Desktop Task Overlay"
shortcut.Save

' 3. Boot the application silently in the background immediately
shell.Run "cmd.exe /c """ & scriptDir & "\launch.bat""", 0, False

' 4. Launch the gorgeous, custom brand green installation success screen in their browser!
shell.Run "https://dailymax.vercel.app/?installed=true"
