#!/bin/bash

echo "#######################################################################"
echo "                        CREATE ACTION"
echo "#######################################################################"


#echo "#######################################################################"
#echo "Starting Login.yml"
#echo "#######################################################################"
#artillery run Login.yml

echo "#######################################################################"
echo "Starting ActionUnAuthorized.yml"
echo "#######################################################################"
artillery run ActionUnAuthorized.yml

echo "#######################################################################"
echo "Starting ActionSuccessAddres.yml"
echo "#######################################################################"
artillery run ActionSuccessAddres.yml

echo "#######################################################################"
echo "Starting ActionSuccsessGPS.yml"
echo "#######################################################################"
artillery run ActionSuccsessGPS.yml


echo "#######################################################################"
echo "Starting ActionFailBadRequestMoveType.yml"
echo "#######################################################################"
artillery run ActionFailBadRequestMoveType.yml

echo "#######################################################################"
echo "Starting ActionSuccessVin.yml"
echo "#######################################################################"
artillery run ActionSuccessVin.yml

echo "#######################################################################"
echo "Starting ActionSuccessStockNumberVehicle.yml"
echo "#######################################################################"
artillery run ActionSuccessStockNumberVehicle.yml


echo "#######################################################################"
echo "All scripts executed"
echo "#######################################################################"