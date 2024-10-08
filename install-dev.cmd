@rem cmd/c npm i -g esbuild
cd ..
if not exist "node_module" ( 
    mkdir node_modules
)

cmd/c npm i diff


if not exist "ptk" (
    git clone https://github.com/accelon/ptk
)

if not exist "lossless-simplified-chinese" (
    git clone https://github.com/accelon/lossless-simplified-chinese
)
if not exist "offtextview" (
    git clone https://github.com/accelon/offtextview

if not exist "provident-pali" (
    git clone https://github.com/dhamma/provident-pali
)

if not exist "adbjs" (
    git clone https://github.com/accelon/adbjs
)


cd node_modules

if not exist "ptk" (
    mklink/j ptk ..\ptk
)
if not exist "offtextview" (
    mklink/j offtextview ..\offtextview
)
if not exist "lossless-simplified-chinese" (
    mklink/j lossless-simplified-chinese ..\lossless-simplified-chinese
)
if not exist "provident-pali" (
    mklink/j provident-pali ..\provident-pali
)
if not exist "adbjs" (
    mklink/j adbjs ..\adbjs
)

if not exist "accelon23" (
    mklink/j accelon23 ..\accelon23
)


cd ptk
cmd/c build-cjs.cmd
cmd/c npm link

cd ..\..\accelon23

cmd/c npm i
