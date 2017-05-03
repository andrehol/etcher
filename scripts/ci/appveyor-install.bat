@echo off

:: Copyright 2017 resin.io
::
:: Licensed under the Apache License, Version 2.0 (the "License");
:: you may not use this file except in compliance with the License.
:: You may obtain a copy of the License at
::
::   http://www.apache.org/licenses/LICENSE-2.0
::
:: Unless required by applicable law or agreed to in writing, software
:: distributed under the License is distributed on an "AS IS" BASIS,
:: WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
:: See the License for the specific language governing permissions and
:: limitations under the License.

IF "%APPVEYOR_REPO_BRANCH%"=="" (
  ECHO This script is only meant to run in Appveyor CI 1>&2
  EXIT /B 1
)

npm install -g npm@4.4.4
npm config set spin=false

choco install nsis -version 2.51
choco install jq
choco install curl

set PATH=C:\Program Files (x86)\Windows Kits\8.1\bin\x86;%PATH%
set PATH=C:\Program Files (x86)\NSIS;%PATH%
set PATH=C:\MinGW\bin;%PATH%
set PATH=C:\MinGW\msys\1.0\bin;%PATH%

pip install codespell==1.9.2 awscli cpplint

make info
make electron-develop

EXIT /B %ERRORLEVEL%
