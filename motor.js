var Stepper_lib = require('jsupm_uln200xa');

var controlStepper = 0;
exports.controlmotor = function(){
    var myStepper_obj = new Stepper_lib.ULN200XA(1000, 1, 2, 3, 4);
    myStepper_obj.runningStepper = function()
    {
        myStepper_obj.setSpeed(5); // 5 RPMs
        myStepper_obj.setDirection(Stepper_lib.ULN200XA.DIR_CW);
        //console.log("Girando Sentido Horário");
        myStepper_obj.stepperSteps(1000);
    };

    myStepper_obj.changingDirection = function()
    {
        //console.log("Girando sentido Anti-Horario");
        myStepper_obj.setSpeed(5);
        myStepper_obj.setDirection(Stepper_lib.ULN200XA.DIR_CCW);
        myStepper_obj.stepperSteps(1000);
    };
    if(controlStepper == 0){
    controlStepper = 1;
    myStepper_obj.runningStepper();  
  }else{
    controlStepper = 0;
    myStepper_obj.changingDirection();
  }
}
// Run ULN200xa driven stepper