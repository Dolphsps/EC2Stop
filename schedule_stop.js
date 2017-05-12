// JavaScript source code
// Version 1.3
// Auth: Andreas Lonberg - andreas.lonberg@gmail.com
// Date: 05/04/2017
// v1.2 06/04/2017 Removing for-loop within function
// v1.3 11/05/2017 Moved  Target Tag and Value to Parameters

var AWS = require('aws-sdk');
exports.handler = function (event, context) {
    var targetTag = "Schedule";
    var targetTagVal = "12x5";

    var ec2 = new AWS.EC2({ apiVersion: 'latest' });
    var param = {
        Filters: [
            { Name: 'instance-state-name', Values: ['running'] },
            { Name: "tag-key", Values: [targetTag] },
            { Name: "tag-value", Values: [targetTagVal] }
        ]
    };

    var instanceList = new Array();

    ec2.describeInstances(param, function (err, data) {
        if (err) {
            console.log("Error!");
        }
        else {

            for (var item in data.Reservations) {
                var instances = data.Reservations[item].Instances;
                for (var instance in instances) {

                    instanceList[instanceList.length] = instances[instance].InstanceId;

                }
            }

            //console.log(instanceList)
            //console.log(instanceList.length)

            var ccount = instanceList.length;
            //console.log(ccount);
            if (ccount > 0) {
                var params1 = {
                    InstanceIds: instanceList
                };

                //console.log(params1);
                //console.log(instanceList.length);

                if (ccount == 1) {
                    console.log("1 instance will be stopped");
                } else {
                    console.log(ccount + " instances will be stopped");
                }

                ec2.stopInstances(params1, function (err, data1) {
                    if (err) console.log(err, err.stack); // an error occurred
                    //else console.log(data1);           // successful response
                });
            }

            else {
                console.log("No instances to be stopped");
            }
        }
    }
    );
};
