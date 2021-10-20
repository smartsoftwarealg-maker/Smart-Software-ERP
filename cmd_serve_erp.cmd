@echo off
cls
nx serve erp --configuration development --host 0.0.0.0 --aot --disable-host-check
pause