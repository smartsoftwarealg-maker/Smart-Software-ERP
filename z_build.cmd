@echo off
cls
echo Building...
call nx build test-app --prod --skip-nx-cache --namedChunks=true --buildOptimizer --extractLicenses --optimization --no-sourceMap



