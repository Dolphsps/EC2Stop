# aws_lambda_scripts
A set of Lambda scripts for a variety of purposes


05/04/2017 - Added EC2 Scheduler.
EC2 Scheduler consists of two AWS LAMBDA scripts to stop and start EC2 instances.
Each instance needs a TAG called Schedule and a value set to AUTO but this can easily be amended.

11/05/2017 - Moved TAG and Value to parameters and added them the beginning of the script
for ease of customisation.  Split out start and stop function into separate YAML files.

