library(tidyverse)
library(readxl)


#Download data and save it
myData = read_csv("/home/jacob/lichenproject/node_modules/r-script/EA_data_half_loc copy.csv")

myData = select(myData, -c(X1,site,sample,species,ycollect,ypublish,tech)) %>%
  rename(Ca = CaPERC, K = KPERC, Mg = MgPERC, N = NPERC, P = PPERC, S = SPERC)

#Ca
caScaled = (pull(myData, Ca)-mean(myData[["Ca"]], na.rm = TRUE))/sd(myData[["Ca"]], na.rm = TRUE)
caQuartile = quantile(caScaled, na.rm = TRUE)
upperBound = (caQuartile[4] - caQuartile[2]) * 1.5
ca75 = (caQuartile[4] * sd(myData[["Ca"]], na.rm = TRUE)) + mean(myData[["Ca"]], na.rm = TRUE)
ca100 = (upperBound * sd(myData[["Ca"]], na.rm = TRUE)) + mean(myData[["Ca"]], na.rm = TRUE)
print( c(ca75, ca100) )
#K
kScaled = (pull(myData, K)-mean(myData[["K"]], na.rm = TRUE))/sd(myData[["K"]], na.rm = TRUE)
kQuartile = quantile(kScaled, na.rm = TRUE)
upperBound = (kQuartile[4] - kQuartile[2]) * 1.5
k75 = (kQuartile[4] * sd(myData[["K"]], na.rm = TRUE)) + mean(myData[["K"]], na.rm = TRUE)
k100 = (upperBound * sd(myData[["K"]], na.rm = TRUE)) + mean(myData[["K"]], na.rm = TRUE)
print( c(k75, k100) )
#Mg
mgScaled = (pull(myData, Mg)-mean(myData[["Mg"]], na.rm = TRUE))/sd(myData[["Mg"]], na.rm = TRUE)
mgQuartile = quantile(mgScaled, na.rm = TRUE)
upperBound = (mgQuartile[4] - mgQuartile[2]) * 1.5
mg75 = (mgQuartile[4] * sd(myData[["Mg"]], na.rm = TRUE)) + mean(myData[["Mg"]], na.rm = TRUE)
mg100 = (upperBound * sd(myData[["Mg"]], na.rm = TRUE)) + mean(myData[["Mg"]], na.rm = TRUE)
print( c(mg75, mg100) )
#N
nScaled = (pull(myData, N)-mean(myData[["N"]], na.rm = TRUE))/sd(myData[["N"]], na.rm = TRUE)
nQuartile = quantile(nScaled, na.rm = TRUE)
upperBound = (nQuartile[4] - nQuartile[2]) * 1.5
n75 = (nQuartile[4] * sd(myData[["N"]], na.rm = TRUE)) + mean(myData[["N"]], na.rm = TRUE)
n100 = (upperBound * sd(myData[["N"]], na.rm = TRUE)) + mean(myData[["N"]], na.rm = TRUE)
print( c(n75, n100) )
#P
pScaled = (pull(myData, P)-mean(myData[["P"]], na.rm = TRUE))/sd(myData[["P"]], na.rm = TRUE)
pQuartile = quantile(pScaled, na.rm = TRUE)
upperBound = (pQuartile[4] - pQuartile[2]) * 1.5
p75 = (pQuartile[4] * sd(myData[["P"]], na.rm = TRUE)) + mean(myData[["P"]], na.rm = TRUE)
p100 = (upperBound * sd(myData[["P"]], na.rm = TRUE)) + mean(myData[["P"]], na.rm = TRUE)
print( c(p75, p100) )
#S
sScaled = (pull(myData, S)-mean(myData[["S"]], na.rm = TRUE))/sd(myData[["S"]], na.rm = TRUE)
sQuartile = quantile(sScaled, na.rm = TRUE)
upperBound = (sQuartile[4] - sQuartile[2]) * 1.5
s75 = (sQuartile[4] * sd(myData[["S"]], na.rm = TRUE)) + mean(myData[["S"]], na.rm = TRUE)
s100 = (upperBound * sd(myData[["S"]], na.rm = TRUE)) + mean(myData[["S"]], na.rm = TRUE)
print( c(s75, s100) )
#Al
alScaled = (pull(myData, Al)-mean(myData[["Al"]], na.rm = TRUE))/sd(myData[["Al"]], na.rm = TRUE)
alQuartile = quantile(alScaled, na.rm = TRUE)
upperBound = (alQuartile[4] - alQuartile[2]) * 1.5
al75 = (alQuartile[4] * sd(myData[["Al"]], na.rm = TRUE)) + mean(myData[["Al"]], na.rm = TRUE)
al100 = (upperBound * sd(myData[["Al"]], na.rm = TRUE)) + mean(myData[["Al"]], na.rm = TRUE)
print( c(al75, al100) )
#As
asScaled = (pull(myData, As)-mean(myData[["As"]], na.rm = TRUE))/sd(myData[["As"]], na.rm = TRUE)
asQuartile = quantile(asScaled, na.rm = TRUE)
upperBound = (asQuartile[4] - asQuartile[2]) * 1.5
as75 = (asQuartile[4] * sd(myData[["As"]], na.rm = TRUE)) + mean(myData[["As"]], na.rm = TRUE)
as100 = (upperBound * sd(myData[["As"]], na.rm = TRUE)) + mean(myData[["As"]], na.rm = TRUE)
print( c(as75, as100) )
#B
bScaled = (pull(myData, B)-mean(myData[["B"]], na.rm = TRUE))/sd(myData[["B"]], na.rm = TRUE)
bQuartile = quantile(bScaled, na.rm = TRUE)
upperBound = (bQuartile[4] - bQuartile[2]) * 1.5
b75 = (bQuartile[4] * sd(myData[["B"]], na.rm = TRUE)) + mean(myData[["B"]], na.rm = TRUE)
b100 = (upperBound * sd(myData[["B"]], na.rm = TRUE)) + mean(myData[["B"]], na.rm = TRUE)
print( c(b75, b100) )
#Ba
baScaled = (pull(myData, Ba)-mean(myData[["Ba"]], na.rm = TRUE))/sd(myData[["Ba"]], na.rm = TRUE)
baQuartile = quantile(baScaled, na.rm = TRUE)
upperBound = (baQuartile[4] - baQuartile[2]) * 1.5
ba75 = (baQuartile[4] * sd(myData[["Ba"]], na.rm = TRUE)) + mean(myData[["Ba"]], na.rm = TRUE)
ba100 = (upperBound * sd(myData[["Ba"]], na.rm = TRUE)) + mean(myData[["Ba"]], na.rm = TRUE)
print( c(ba75, ba100) )
#Cd
cdScaled = (pull(myData, Cd)-mean(myData[["Cd"]], na.rm = TRUE))/sd(myData[["Cd"]], na.rm = TRUE)
cdQuartile = quantile(cdScaled, na.rm = TRUE)
upperBound = (cdQuartile[4] - cdQuartile[2]) * 1.5
cd75 = (cdQuartile[4] * sd(myData[["Cd"]], na.rm = TRUE)) + mean(myData[["Cd"]], na.rm = TRUE)
cd100 = (upperBound * sd(myData[["Cd"]], na.rm = TRUE)) + mean(myData[["Cd"]], na.rm = TRUE)
print( c(cd75, cd100) )
#Co
coScaled = (pull(myData, Co)-mean(myData[["Co"]], na.rm = TRUE))/sd(myData[["Co"]], na.rm = TRUE)
coQuartile = quantile(coScaled, na.rm = TRUE)
upperBound = (coQuartile[4] - coQuartile[2]) * 1.5
co75 = (coQuartile[4] * sd(myData[["Co"]], na.rm = TRUE)) + mean(myData[["Co"]], na.rm = TRUE)
co100 = (upperBound * sd(myData[["Co"]], na.rm = TRUE)) + mean(myData[["Co"]], na.rm = TRUE)
print( c(co75, co100) )
#Cr
crScaled = (pull(myData, Cr)-mean(myData[["Cr"]], na.rm = TRUE))/sd(myData[["Cr"]], na.rm = TRUE)
crQuartile = quantile(crScaled, na.rm = TRUE)
upperBound = (crQuartile[4] - crQuartile[2]) * 1.5
cr75 = (crQuartile[4] * sd(myData[["Cr"]], na.rm = TRUE)) + mean(myData[["Cr"]], na.rm = TRUE)
cr100 = (upperBound * sd(myData[["Cr"]], na.rm = TRUE)) + mean(myData[["Cr"]], na.rm = TRUE)
print( c(cr75, cr100) )
#Cu
cuScaled = (pull(myData, Cu)-mean(myData[["Cu"]], na.rm = TRUE))/sd(myData[["Cu"]], na.rm = TRUE)
cuQuartile = quantile(cuScaled, na.rm = TRUE)
upperBound = (cuQuartile[4] - cuQuartile[2]) * 1.5
cu75 = (cuQuartile[4] * sd(myData[["Cu"]], na.rm = TRUE)) + mean(myData[["Cu"]], na.rm = TRUE)
cu100 = (upperBound * sd(myData[["Cu"]], na.rm = TRUE)) + mean(myData[["Cu"]], na.rm = TRUE)
print( c(cu75, cu100) )
#Fe
feScaled = (pull(myData, Fe)-mean(myData[["Fe"]], na.rm = TRUE))/sd(myData[["Fe"]], na.rm = TRUE)
feQuartile = quantile(feScaled, na.rm = TRUE)
upperBound = (feQuartile[4] - feQuartile[2]) * 1.5
fe75 = (feQuartile[4] * sd(myData[["Fe"]], na.rm = TRUE)) + mean(myData[["Fe"]], na.rm = TRUE)
fe100 = (upperBound * sd(myData[["Fe"]], na.rm = TRUE)) + mean(myData[["Fe"]], na.rm = TRUE)
print( c(fe75, fe100) )
#Mn
mnScaled = (pull(myData, Mn)-mean(myData[["Mn"]], na.rm = TRUE))/sd(myData[["Mn"]], na.rm = TRUE)
mnQuartile = quantile(mnScaled, na.rm = TRUE)
upperBound = (mnQuartile[4] - mnQuartile[2]) * 1.5
mn75 = (mnQuartile[4] * sd(myData[["Mn"]], na.rm = TRUE)) + mean(myData[["Mn"]], na.rm = TRUE)
mn100 = (upperBound * sd(myData[["Mn"]], na.rm = TRUE)) + mean(myData[["Mn"]], na.rm = TRUE)
print( c(mn75, mn100) )
#Mo
moScaled = (pull(myData, Mo)-mean(myData[["Mo"]], na.rm = TRUE))/sd(myData[["Mo"]], na.rm = TRUE)
moQuartile = quantile(moScaled, na.rm = TRUE)
upperBound = (moQuartile[4] - moQuartile[2]) * 1.5
mo75 = (moQuartile[4] * sd(myData[["Mo"]], na.rm = TRUE)) + mean(myData[["Mo"]], na.rm = TRUE)
mo100 = (upperBound * sd(myData[["Mo"]], na.rm = TRUE)) + mean(myData[["Mo"]], na.rm = TRUE)
print( c(mo75, mo100) )
#Na
naScaled = (pull(myData, Na)-mean(myData[["Na"]], na.rm = TRUE))/sd(myData[["Na"]], na.rm = TRUE)
naQuartile = quantile(naScaled, na.rm = TRUE)
upperBound = (naQuartile[4] - naQuartile[2]) * 1.5
na75 = (naQuartile[4] * sd(myData[["Na"]], na.rm = TRUE)) + mean(myData[["Na"]], na.rm = TRUE)
na100 = (upperBound * sd(myData[["Na"]], na.rm = TRUE)) + mean(myData[["Na"]], na.rm = TRUE)
print( c(na75, na100) )
#Ni
niScaled = (pull(myData, Ni)-mean(myData[["Ni"]], na.rm = TRUE))/sd(myData[["Ni"]], na.rm = TRUE)
niQuartile = quantile(niScaled, na.rm = TRUE)
upperBound = (niQuartile[4] - niQuartile[2]) * 1.5
ni75 = (niQuartile[4] * sd(myData[["Ni"]], na.rm = TRUE)) + mean(myData[["Ni"]], na.rm = TRUE)
ni100 = (upperBound * sd(myData[["Ni"]], na.rm = TRUE)) + mean(myData[["Ni"]], na.rm = TRUE)
print( c(ni75, ni100) )
#Pb
pbScaled = (pull(myData, Pb)-mean(myData[["Pb"]], na.rm = TRUE))/sd(myData[["Pb"]], na.rm = TRUE)
pbQuartile = quantile(pbScaled, na.rm = TRUE)
upperBound = (pbQuartile[4] - pbQuartile[2]) * 1.5
pb75 = (pbQuartile[4] * sd(myData[["Pb"]], na.rm = TRUE)) + mean(myData[["Pb"]], na.rm = TRUE)
pb100 = (upperBound * sd(myData[["Pb"]], na.rm = TRUE)) + mean(myData[["Pb"]], na.rm = TRUE)
print( c(pb75, pb100) )
#Se
seScaled = (pull(myData, Se)-mean(myData[["Se"]], na.rm = TRUE))/sd(myData[["Se"]], na.rm = TRUE)
seQuartile = quantile(seScaled, na.rm = TRUE)
upperBound = (seQuartile[4] - seQuartile[2]) * 1.5
se75 = (seQuartile[4] * sd(myData[["Se"]], na.rm = TRUE)) + mean(myData[["Se"]], na.rm = TRUE)
se100 = (upperBound * sd(myData[["Se"]], na.rm = TRUE)) + mean(myData[["Se"]], na.rm = TRUE)
print( c(se75, se100) )
#Si
siScaled = (pull(myData, Si)-mean(myData[["Si"]], na.rm = TRUE))/sd(myData[["Si"]], na.rm = TRUE)
siQuartile = quantile(siScaled, na.rm = TRUE)
upperBound = (siQuartile[4] - siQuartile[2]) * 1.5
si75 = (siQuartile[4] * sd(myData[["Si"]], na.rm = TRUE)) + mean(myData[["Si"]], na.rm = TRUE)
si100 = (upperBound * sd(myData[["Si"]], na.rm = TRUE)) + mean(myData[["Si"]], na.rm = TRUE)
print( c(si75, si100) )
#Sr
srScaled = (pull(myData, Sr)-mean(myData[["Sr"]], na.rm = TRUE))/sd(myData[["Sr"]], na.rm = TRUE)
srQuartile = quantile(srScaled, na.rm = TRUE)
upperBound = (srQuartile[4] - srQuartile[2]) * 1.5
sr75 = (srQuartile[4] * sd(myData[["Sr"]], na.rm = TRUE)) + mean(myData[["Sr"]], na.rm = TRUE)
sr100 = (upperBound * sd(myData[["Sr"]], na.rm = TRUE)) + mean(myData[["Sr"]], na.rm = TRUE)
print( c(sr75, sr100) )
#Ti
tiScaled = (pull(myData, Ti)-mean(myData[["Ti"]], na.rm = TRUE))/sd(myData[["Ti"]], na.rm = TRUE)
tiQuartile = quantile(tiScaled, na.rm = TRUE)
upperBound = (tiQuartile[4] - tiQuartile[2]) * 1.5
ti75 = (tiQuartile[4] * sd(myData[["Ti"]], na.rm = TRUE)) + mean(myData[["Ti"]], na.rm = TRUE)
ti100 = (upperBound * sd(myData[["Ti"]], na.rm = TRUE)) + mean(myData[["Ti"]], na.rm = TRUE)
print( c(ti75, ti100) )
#V
vScaled = (pull(myData, V)-mean(myData[["V"]], na.rm = TRUE))/sd(myData[["V"]], na.rm = TRUE)
vQuartile = quantile(vScaled, na.rm = TRUE)
upperBound = (vQuartile[4] - vQuartile[2]) * 1.5
v75 = (vQuartile[4] * sd(myData[["V"]], na.rm = TRUE)) + mean(myData[["V"]], na.rm = TRUE)
v100 = (upperBound * sd(myData[["V"]], na.rm = TRUE)) + mean(myData[["V"]], na.rm = TRUE)
print( c(v75, v100) )
#Zn
znScaled = (pull(myData, Zn)-mean(myData[["Zn"]], na.rm = TRUE))/sd(myData[["Zn"]], na.rm = TRUE)
znQuartile = quantile(znScaled, na.rm = TRUE)
upperBound = (znQuartile[4] - znQuartile[2]) * 1.5
zn75 = (znQuartile[4] * sd(myData[["Zn"]], na.rm = TRUE)) + mean(myData[["Zn"]], na.rm = TRUE)
zn100 = (upperBound * sd(myData[["Zn"]], na.rm = TRUE)) + mean(myData[["Zn"]], na.rm = TRUE)
print( c(zn75, zn100) )
#Cl
clScaled = (pull(myData, Cl)-mean(myData[["Cl"]], na.rm = TRUE))/sd(myData[["Cl"]], na.rm = TRUE)
clQuartile = quantile(clScaled, na.rm = TRUE)
upperBound = (clQuartile[4] - clQuartile[2]) * 1.5
cl75 = (clQuartile[4] * sd(myData[["Cl"]], na.rm = TRUE)) + mean(myData[["Cl"]], na.rm = TRUE)
cl100 = (upperBound * sd(myData[["Cl"]], na.rm = TRUE)) + mean(myData[["Cl"]], na.rm = TRUE)
print( c(cl75, cl100) )
#Br
brScaled = (pull(myData, Br)-mean(myData[["Br"]], na.rm = TRUE))/sd(myData[["Br"]], na.rm = TRUE)
brQuartile = quantile(brScaled, na.rm = TRUE)
upperBound = (brQuartile[4] - brQuartile[2]) * 1.5
br75 = (brQuartile[4] * sd(myData[["Br"]], na.rm = TRUE)) + mean(myData[["Br"]], na.rm = TRUE)
br100 = (upperBound * sd(myData[["Br"]], na.rm = TRUE)) + mean(myData[["Br"]], na.rm = TRUE)
print( c(br75, br100) )
#Rb
rbScaled = (pull(myData, Rb)-mean(myData[["Rb"]], na.rm = TRUE))/sd(myData[["Rb"]], na.rm = TRUE)
rbQuartile = quantile(rbScaled, na.rm = TRUE)
upperBound = (rbQuartile[4] - rbQuartile[2]) * 1.5
rb75 = (rbQuartile[4] * sd(myData[["Rb"]], na.rm = TRUE)) + mean(myData[["Rb"]], na.rm = TRUE)
rb100 = (upperBound * sd(myData[["Rb"]], na.rm = TRUE)) + mean(myData[["Rb"]], na.rm = TRUE)
print( c(rb75, rb100) )
#Cu.Zn
cuznScaled = (pull(myData, Cu.Zn)-mean(myData[["Cu.Zn"]], na.rm = TRUE))/sd(myData[["Cu.Zn"]], na.rm = TRUE)
cuznQuartile = quantile(cuznScaled, na.rm = TRUE)
upperBound = (cuznQuartile[4] - cuznQuartile[2]) * 1.5
cuzn75 = (cuznQuartile[4] * sd(myData[["Cu.Zn"]], na.rm = TRUE)) + mean(myData[["Cu.Zn"]], na.rm = TRUE)
cuzn100 = (upperBound * sd(myData[["Cu.Zn"]], na.rm = TRUE)) + mean(myData[["Cu.Zn"]], na.rm = TRUE)
print( c(cuzn75, cuzn100) )
#Fe.Ti
fetiScaled = (pull(myData, Fe.Ti)-mean(myData[["Fe.Ti"]], na.rm = TRUE))/sd(myData[["Fe.Ti"]], na.rm = TRUE)
fetiQuartile = quantile(fetiScaled, na.rm = TRUE)
upperBound = (fetiQuartile[4] - fetiQuartile[2]) * 1.5
feti75 = (fetiQuartile[4] * sd(myData[["Fe.Ti"]], na.rm = TRUE)) + mean(myData[["Fe.Ti"]], na.rm = TRUE)
feti100 = (upperBound * sd(myData[["Fe.Ti"]], na.rm = TRUE)) + mean(myData[["Fe.Ti"]], na.rm = TRUE)
print( c(feti75, feti100) )
#F
fScaled = (pull(myData, F)-mean(myData[["F"]], na.rm = TRUE))/sd(myData[["F"]], na.rm = TRUE)
fQuartile = quantile(fScaled, na.rm = TRUE)
upperBound = (fQuartile[4] - fQuartile[2]) * 1.5
f75 = (fQuartile[4] * sd(myData[["F"]], na.rm = TRUE)) + mean(myData[["F"]], na.rm = TRUE)
f100 = (upperBound * sd(myData[["F"]], na.rm = TRUE)) + mean(myData[["F"]], na.rm = TRUE)
print( c(f75, f100) )
