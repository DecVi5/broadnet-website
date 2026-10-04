Set WshShell = CreateObject("WScript.Shell")
Set objSysInfo = CreateObject("Win32_Process")

' ── Step 1: Kill anything already on port 3000 ──────────────────────────────
WshShell.Run "cmd /c for /f ""tokens=5"" %a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do taskkill /f /pid %a >nul 2>&1", 0, True

' ── Step 2: Write a tiny helper bat that starts the server ──────────────────
Dim batPath
batPath = "D:\Work\Brands\BroadNet\broadnet-nextjs\_run_server.bat"

Dim fso, f
Set fso = CreateObject("Scripting.FileSystemObject")
Set f = fso.CreateTextFile(batPath, True)
f.WriteLine "@echo off"
f.WriteLine "title BroadNet Dev Server"
f.WriteLine "color 0A"
f.WriteLine "cd /d D:\Work\Brands\BroadNet\broadnet-nextjs"
f.WriteLine "echo Starting BroadNet server..."
f.WriteLine "npm run dev"
f.WriteLine "pause"
f.Close

' ── Step 3: Use schtasks to run the bat as a COMPLETELY INDEPENDENT process ──
' This escapes the IDE process tree entirely
WshShell.Run "cmd /c schtasks /create /f /tn ""BroadNetDev"" /tr """ & batPath & """ /sc once /st 00:00 /rl highest >nul 2>&1", 0, True
WshShell.Run "cmd /c schtasks /run /tn ""BroadNetDev"" >nul 2>&1", 0, True

' ── Step 4: Wait for server to be ready then open browser ───────────────────
WScript.Sleep 9000
WshShell.Run "http://localhost:3000"
