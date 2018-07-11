#!/bin/bash

# purpose
# Create a gpx file from a directory of jpg files.
# Modification RMD 13 november 2017 RMD Added check for missing geolocation
# 	need to fix lon lat manually, set to 0 ,0 for now.
# 	Check GPS date. Sometimes this also is missing.
# Modification RMD 06 januari 2018 renamed to v2 and soft link to most recent version
# Modification RMD 18 may 2018 renamed to v3 and soft link to most recent version
#  ln -s GPStoDecimal_v3.sh GPStoDecimal.sh
#  add a more descriptive key "desc" and "time", "name" will remain photo filename
#  extract substring from filename to use as description 
# usage
# GPSToDecimal.sh gpxfile.gpx




# copy gpx to file with OL code
# save output to file for cases which contain an error


infile=$1
if [ -z "$1" ]
  then
    echo "Usage:"
    echo "GPStoDecimal.sh gpxfile"
    echo "File to be created"
  else
# header of gfx formatted files
# time on camera is utc

#<?xml version="1.0" 
#encoding="UTF-8" 
#standalone="no" ?>
#<gpx version="1.1" 
#creator="RMD Observations" 
#xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
#xmlns="http://www.topografix.com/GPX/1/1" 
#xsi:schemaLocation="http://www.topografix.com/GPX/1/1 
#http://www.topografix.com/GPX/1/1/gpx.xsd">"

# waypoint format
#<wpt lat="52.70565" lon="4.69206">
#<name>name is5066</name><desc>description is5066</desc>
#</wpt>

xml='<?xml version="1.0" '
encoding='encoding="UTF-8" '
echo $xml  $encoding
begingpx='<gpx version="1.1"'
creator='creator="RMD Observations" '
xmlns1='xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
xmlns2='xmlns="http://www.topografix.com/GPX/1/1"'
xsi='xsi:schemaLocation="http://www.topografix.com/GPX/1/1'
http='http://www.topografix.com/GPX/1/1/gpx.xsd">"'
endgpx='</gpx>'
echo $begingpx $creator $xmlns1 $xmnls2 $xsi $http  > $infile

wpt1='<wpt lat="'
wpt2='" lon="'
wpt3='">'

lname='<name>'
rname='</name>'
ldesc='<desc>'
rdesc='</desc>'
wpt4='</wpt>'
ltime='<time>'
rtime='</time>'
arrName=($(ls -1 *.jpg))

n=0
for filename in "${arrName[@]}"
	do
	outputLat=$(exiftool -n -p '$GPSLatitude' $filename)
	outputLon=$(exiftool -n -p '$GPSLongitude' $filename)
	arrDate=$(exiftool -n -p '$GPSDateTime' $filename | sed -e 's/ /_/g')
	# extract substring from filename to use as description
	description=${arrName[$n]:3:2};  
		echo "output date: "  $arrDate
	# sometimes GPS date is not recorded, substitute creation date instead.
	if [ -z $arrDate ] 
	then

		echo "GPS date not recorded, substitue creation date"
		arrDate=$(exiftool -n -p '$createdate' $filename | sed -e 's/ /_/g')
	if [ -z $arrDate ] 
		then 
			arrDate="Missing Date"
			echo "No good dates" $createDate
		fi
	fi


	if [ -z $outputLat ] || [ -z $outputLon ] 
	then
		echo "lat or lon is empty, substitute 0" 
	
		dummyLat="0.0"
		dummyLon="0.0"
		echo $wpt1"$dummyLat"$wpt2"$dummyLon"$wpt3 >> $infile
		echo $ltime"${arrDate}"$rtime >> $infile
		echo $lname"${arrName[$n]}"$rname >> $infile
		echo $ldesc"${arrDate}"$rdesc >> $infile
		echo $wpt4 >> $infile
	else
		echo "latitude: " $outputLat "longitude: " $outputLon "Filename: " $filename
		arrLon=$(exiftool -n -p  '$GPSLongitude' $filename )
		arrLat=$(exiftool -n -p  '$GPSLatitude' $filename )
		echo $wpt1"${arrLat}"$wpt2"${arrLon}"$wpt3 >> $infile
		echo $ltime"${arrDate}"$rtime >> $infile
		echo $lname"${arrName[$n]}"$rname >> $infile
		echo $ldesc"$description"$rdesc >> $infile
		echo $wpt4 >> $infile
	fi
let n++
done

fi

echo $endgpx >> $infile 

