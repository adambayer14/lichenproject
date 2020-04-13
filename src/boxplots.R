library(tidyverse)
library(readxl)

#Make generic color vec for legend later
colorVec = c("red","blue","yellow","orange","hotpink", "mediumorchid4", "lightsalmon", "lightseagreen", "cyan", "cornflowerblue", "lightpink", "lightgreen")


#Download data and save it
myData = read_csv("~/Desktop/lichenproject/public/EA_data_half_loc copy.csv")
myDataPerm = myData
#Get sites as unique vector
tempData = arrange(myData, site)
uniqueSites = unique(pull(tempData, site))


#Edit data for graphing purposes
myData = select(myData, -c(X1,site,sample,species,ycollect,ypublish,tech))

percentData = select(myData, c(CaPERC,KPERC,MgPERC,NPERC,PPERC,SPERC)) %>%
  rename(Ca = CaPERC, K = KPERC, Mg = MgPERC, N = NPERC, P = PPERC, S = SPERC)
percentDataPerm = percentData
percentData = data.frame(scale(percentData))
percentData = gather(percentData, Element, Percent, Ca,K,Mg,N,P,S)

elemData = select(myData , c(Al,As,B,Ba,Cd,Co,Cr,Cu,Fe,Mn,Mo,Na,Ni,Pb,Se,Si,Sr,Ti,V,Zn,Cl,Br,Rb,Cu.Zn,Fe.Ti,F))
elemDataPerm = elemData
elemData = data.frame(scale(elemData))
elemData = gather(elemData, Element, ppm, Al,As,B,Ba,Cd,Co,Cr,Cu,Fe,Mn,Mo,Na,Ni,Pb,Se,Si,Sr,Ti,V,Zn,Cl,Br,Rb,Cu.Zn,Fe.Ti,F)
#End of data sorting



for (siteID in uniqueSites) {
  endColors = c()
  sampleNumbers = c()
  
  #Grab necessary data for specific site
  #siteID = "HTNF97_05_13"
  siteData = filter(myDataPerm, site == siteID) %>%
    select(-c(X1,site,species,ycollect,ypublish,tech)) %>%
    rename(Ca = CaPERC, K = KPERC, Mg = MgPERC, N = NPERC, P = PPERC, S = SPERC) %>%
    arrange(sample)
  
  #Loop through each row of site data to make colors and sample number labels for legend later
  j = 1
  for ( row in 1:nrow(siteData) ) {
    sampleNumbers = c(sampleNumbers, siteData[[row, "sample"]])
    endColors = c(endColors, colorVec[j])
    j = j + 1
  }
  
  
  #Make each graph base
  percentPlot = ggplot(data = percentData, aes(x = Element, y = Percent)) +
    geom_boxplot(outlier.size = .5)
  ppmPlot = ggplot(data = elemData, aes(x = Element, y = ppm)) +
    geom_boxplot(show.legend = FALSE, outlier.size = .5) 
  
  #Loop through for each row and do math to scale and make new df after
  Ca = c()
  K = c()
  Mg = c()
  N = c()
  P = c()
  S = c()
  Al = c()
  As = c()
  B = c()
  Ba = c()
  Cd = c()
  Co = c()
  Cr = c()
  Cu = c()
  Fe = c()
  Mn = c()
  Mo = c()
  Na = c()
  Ni = c()
  Pb = c()
  Se = c()
  Si = c()
  Sr = c()
  Ti = c()
  V = c()
  Zn = c()
  Cl = c()
  Br = c()
  Rb = c()
  Cu.Zn = c()
  Fe.Ti = c()
  F = c()
  for ( row in 1:nrow(siteData) ) {
    #Get all scaled individual values for the points in graph 
    caScaled = (siteData[[row, "Ca"]]-mean(percentDataPerm[["Ca"]], na.rm = TRUE))/sd(percentDataPerm[["Ca"]], na.rm = TRUE)
    kScaled = (siteData[[row, "K"]]-mean(percentDataPerm[["K"]], na.rm = TRUE))/sd(percentDataPerm[["K"]], na.rm = TRUE)
    mgScaled = (siteData[[row, "Mg"]]-mean(percentDataPerm[["Mg"]], na.rm = TRUE))/sd(percentDataPerm[["Mg"]], na.rm = TRUE)
    nScaled = (siteData[[row, "N"]]-mean(percentDataPerm[["N"]], na.rm = TRUE))/sd(percentDataPerm[["N"]], na.rm = TRUE)
    pScaled = (siteData[[row, "P"]]-mean(percentDataPerm[["P"]], na.rm = TRUE))/sd(percentDataPerm[["P"]], na.rm = TRUE)
    sScaled = (siteData[[row, "S"]]-mean(percentDataPerm[["S"]], na.rm = TRUE))/sd(percentDataPerm[["S"]], na.rm = TRUE)
    Ca = c(Ca, caScaled)
    K = c(K, kScaled)
    Mg = c(Mg, mgScaled)
    N = c(N, nScaled)
    P = c(P, pScaled)
    S = c(S, sScaled)
    
    #Same thing but for the ppm elements
    alScaled = (siteData[[row, "Al"]]-mean(elemDataPerm[["Al"]], na.rm = TRUE))/sd(elemDataPerm[["Al"]], na.rm = TRUE)
    asScaled = (siteData[[row, "As"]]-mean(elemDataPerm[["As"]], na.rm = TRUE))/sd(elemDataPerm[["As"]], na.rm = TRUE)
    bScaled = (siteData[[row, "B"]]-mean(elemDataPerm[["B"]], na.rm = TRUE))/sd(elemDataPerm[["B"]], na.rm = TRUE)
    baScaled = (siteData[[row, "Ba"]]-mean(elemDataPerm[["Ba"]], na.rm = TRUE))/sd(elemDataPerm[["Ba"]], na.rm = TRUE)
    cdScaled = (siteData[[row, "Cd"]]-mean(elemDataPerm[["Cd"]], na.rm = TRUE))/sd(elemDataPerm[["Cd"]], na.rm = TRUE)
    coScaled = (siteData[[row, "Co"]]-mean(elemDataPerm[["Co"]], na.rm = TRUE))/sd(elemDataPerm[["Co"]], na.rm = TRUE)
    crScaled = (siteData[[row, "Cr"]]-mean(elemDataPerm[["Cr"]], na.rm = TRUE))/sd(elemDataPerm[["Cr"]], na.rm = TRUE)
    cuScaled = (siteData[[row, "Cu"]]-mean(elemDataPerm[["Cu"]], na.rm = TRUE))/sd(elemDataPerm[["Cu"]], na.rm = TRUE)
    feScaled = (siteData[[row, "Fe"]]-mean(elemDataPerm[["Fe"]], na.rm = TRUE))/sd(elemDataPerm[["Fe"]], na.rm = TRUE)
    mnScaled = (siteData[[row, "Mn"]]-mean(elemDataPerm[["Mn"]], na.rm = TRUE))/sd(elemDataPerm[["Mn"]], na.rm = TRUE)
    moScaled = (siteData[[row, "Mo"]]-mean(elemDataPerm[["Mo"]], na.rm = TRUE))/sd(elemDataPerm[["Mo"]], na.rm = TRUE)
    naScaled = (siteData[[row, "Na"]]-mean(elemDataPerm[["Na"]], na.rm = TRUE))/sd(elemDataPerm[["Na"]], na.rm = TRUE)
    niScaled = (siteData[[row, "Ni"]]-mean(elemDataPerm[["Ni"]], na.rm = TRUE))/sd(elemDataPerm[["Ni"]], na.rm = TRUE)
    pbScaled = (siteData[[row, "Pb"]]-mean(elemDataPerm[["Pb"]], na.rm = TRUE))/sd(elemDataPerm[["Pb"]], na.rm = TRUE)
    seScaled = (siteData[[row, "Se"]]-mean(elemDataPerm[["Se"]], na.rm = TRUE))/sd(elemDataPerm[["Se"]], na.rm = TRUE)
    siScaled = (siteData[[row, "Si"]]-mean(elemDataPerm[["Si"]], na.rm = TRUE))/sd(elemDataPerm[["Si"]], na.rm = TRUE)
    srScaled = (siteData[[row, "Sr"]]-mean(elemDataPerm[["Sr"]], na.rm = TRUE))/sd(elemDataPerm[["Sr"]], na.rm = TRUE)
    tiScaled = (siteData[[row, "Ti"]]-mean(elemDataPerm[["Ti"]], na.rm = TRUE))/sd(elemDataPerm[["Ti"]], na.rm = TRUE)
    vScaled = (siteData[[row, "V"]]-mean(elemDataPerm[["V"]], na.rm = TRUE))/sd(elemDataPerm[["V"]], na.rm = TRUE)
    znScaled = (siteData[[row, "Zn"]]-mean(elemDataPerm[["Zn"]], na.rm = TRUE))/sd(elemDataPerm[["Zn"]], na.rm = TRUE)
    clScaled = (siteData[[row, "Cl"]]-mean(elemDataPerm[["Cl"]], na.rm = TRUE))/sd(elemDataPerm[["Cl"]], na.rm = TRUE)
    brScaled = (siteData[[row, "Br"]]-mean(elemDataPerm[["Br"]], na.rm = TRUE))/sd(elemDataPerm[["Br"]], na.rm = TRUE)
    rbScaled = (siteData[[row, "Rb"]]-mean(elemDataPerm[["Rb"]], na.rm = TRUE))/sd(elemDataPerm[["Rb"]], na.rm = TRUE)
    cuznScaled = (siteData[[row, "Cu.Zn"]]-mean(elemDataPerm[["Cu.Zn"]], na.rm = TRUE))/sd(elemDataPerm[["Cu.Zn"]], na.rm = TRUE)
    fetiScaled = (siteData[[row, "Fe.Ti"]]-mean(elemDataPerm[["Fe.Ti"]], na.rm = TRUE))/sd(elemDataPerm[["Fe.Ti"]], na.rm = TRUE)
    fScaled = (siteData[[row, "F"]]-mean(elemDataPerm[["F"]], na.rm = TRUE))/sd(elemDataPerm[["F"]], na.rm = TRUE)
    Al = c(Al, alScaled)
    As = c(As, asScaled)
    B = c(B, bScaled)
    Ba = c(Ba, baScaled)
    Cd = c(Cd, cdScaled)
    Co = c(Co, coScaled)
    Cr = c(Cr, crScaled)
    Cu = c(Cu, cuScaled)
    Fe = c(Fe, feScaled)
    Mn = c(Mn, mnScaled)
    Mo = c(Mo, moScaled)
    Na = c(Na, naScaled)
    Ni = c(Ni, niScaled)
    Pb = c(Pb, pbScaled)
    Se = c(Se, seScaled)
    Si = c(Si, siScaled)
    Sr = c(Sr, srScaled)
    Ti = c(Ti, tiScaled)
    V = c(V, vScaled)
    Zn = c(Zn, znScaled)
    Cl = c(Cl, clScaled)
    Br = c(Br, brScaled)
    Rb = c(Rb, rbScaled)
    Cu.Zn = c(Cu.Zn, cuznScaled)
    Fe.Ti = c(Fe.Ti, fetiScaled)
    F = c(F, fScaled)
  }
  
  
  #Build percent df
  percentDF = data.frame(sampleNumbers, Ca, K, Mg, N, P, S) %>%
    gather(Element, Percent, Ca,K,Mg,N,P,S)
  #Build ppm df
  ppmDF = data.frame(sampleNumbers, Al,As,B,Ba,Cd,Co,Cr,Cu,Fe,Mn,Mo,Na,Ni,Pb,Se,Si,Sr,Ti,V,Zn,Cl,Br,Rb,Cu.Zn,Fe.Ti,F) %>%
    gather(Element, ppm, Al,As,B,Ba,Cd,Co,Cr,Cu,Fe,Mn,Mo,Na,Ni,Pb,Se,Si,Sr,Ti,V,Zn,Cl,Br,Rb,Cu.Zn,Fe.Ti,F)
  
  #The rest of percent Plot
  percentPlot = percentPlot +
    geom_point(data = percentDF, aes(x = Element, y = Percent, colour = factor(sampleNumbers)), size = 2) +
    scale_color_manual("EA Sample Number", values = endColors, labels = factor(sampleNumbers)) +
    xlab("Element") +
    ylab("Percent Composition (z-score scaled)") +
    annotate(geom = "text", x = 1:6, y = -2, label = c(
      round(mean(percentDataPerm[["Ca"]], na.rm = TRUE), 2),
      round(mean(percentDataPerm[["K"]], na.rm = TRUE), 2),
      round(mean(percentDataPerm[["Mg"]], na.rm = TRUE), 2),
      round(mean(percentDataPerm[["N"]], na.rm = TRUE), 2),
      round(mean(percentDataPerm[["P"]], na.rm = TRUE), 2),
      round(mean(percentDataPerm[["S"]], na.rm = TRUE), 2)
    ), size = 3) +
    ggtitle("Percent Composition Elements") +
    theme_bw(base_size = 8) +
    theme(plot.title = element_text(hjust = 0.5))
  
  
  #The rest of ppm Plot
  ppmPlot = ppmPlot +
    geom_point(data = ppmDF, aes(x = Element, y = ppm, color = factor(sampleNumbers)), size = 1.7) +
    scale_color_manual("EA Sample Number", values = endColors, labels = factor(sampleNumbers)) + 
    xlab("Element") +
    ylab("ppm (z-score scaled)") +
    annotate(geom = "text", x = 1:26, y = -2, label = c(
      round(mean(elemDataPerm[["Al"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["As"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["B"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["Ba"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["Cd"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["Co"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["Cr"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["Cu"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["Fe"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["Mn"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["Mo"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["Na"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["Ni"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["Pb"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["Se"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["Si"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["Sr"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["Ti"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["V"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["Zn"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["Cl"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["Br"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["Rb"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["Cu.Zn"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["Fe.Ti"]], na.rm = TRUE), 2),
      round(mean(elemDataPerm[["F"]], na.rm = TRUE), 2)
    ), size = 1.5) +
    theme_bw(base_size = 8) +
    theme(axis.text.x = element_text(angle=90, hjust=1)) + 
    ggtitle("ppm Elements") + 
    theme(plot.title = element_text(hjust = 0.5))
  
  
  #Save each graph
  percentSave = paste(siteID, "_percent.jpeg", sep = "")
  ppmSave = paste(siteID, "_ppm.jpeg", sep = "")
  
  ggsave(percentSave, plot = percentPlot, width = 8, height = 4.33, path = "~/Desktop/lichenproject/public/images/")
  ggsave(ppmSave, plot = ppmPlot, width = 8, height = 4.33, path = "~/Desktop/lichenproject/public/images/")
  
}

