<template>
	<div id="app">
		<h2>Daily Calorie Calculator</h2>
		<div class="form-group row">
		<label for="measurement" class="col-sm-2 col-form-label">Measurements</label>
			<div class="col-sm-10">
				<div class="form-check form-check-inline mt-2">
					<input type="radio" id="metric" value="metric" v-on:change="measurements" v-model="measurement" />
					<label class="form-check-label" for="metric"> Metric</label>
				</div>
				<div class="form-check form-check-inline">
					<input type="radio" id="imperial" value="imperial" v-on:change="measurements" v-model="measurement" />
					<label class="form-check-label" for="imperial"> Imperial</label>
				</div>
			</div>
		</div>
		<div class="form-group row">
			<label for="gender" class="col-sm-2 col-form-label">Gender</label>
			<div class="col-sm-10">
				<select v-model="gender" id="gender" class="form-control">
					<option value="male">Male</option>
					<option value="female">Female</option>
				</select>
			</div>
		</div>
		<div class="form-group row">
			<label for="height" class="col-sm-2 col-form-label">Height</label>
			<div class="col-sm-10">
				<input type="number" v-if="measurement=='metric'" v-model="cm" class="form-control" id="height" />
				<div class="row" v-if="measurement=='imperial'">
					<div class="col">
						<input type="number" v-model="feet" class="form-control col-xs-2" id="height" />						
					</div>
					<div class="col">
						<input type="number" v-model="inch" class="form-control col-xs-2" id="height" />
					</div>
				</div>
				<small id="heightHelpBlock" class="form-text text-muted">Measured in {{heightMeasure}}</small>											
			</div>
		</div>
		<div class="form-group row">
			<label for="weight" class="col-sm-2 col-form-label">Weight</label>
			<div class="col-sm-10">
				<input type="number" v-model="weight" class="form-control" id="weight" />
				<small id="weightHelpBlock" class="form-text text-muted">Measured in {{weightMeasure}}</small>
			</div>
		</div>
		<div class="form-group row">
			<label for="age" class="col-sm-2 col-form-label">Age</label>
			<div class="col-sm-10">
				<input type="number" v-model="age" class="form-control" id="age" />
			</div>
		</div>
		<div class="row">
			<div class="col">
				<hr />
			</div>
		</div>
		<div class="form-group row">
			<label for="activity" class="col-sm-2 col-form-label">Activity Level</label>
			<div class="col-sm-10">
				<div class="form-check">
					<input type="radio" id="one" value="1.2" v-model="activity_level" />
					<label class="form-check-label" for="one">Sedentary - <em>Spend Most Of The Day Sitting (Bank Teller, Desk Job)</em></label>
				</div>
				<div class="form-check">
					<input type="radio" id="two" value="1.375" v-model="activity_level" />
					<label class="form-check-label" for="two">Light Activity - <em>Spend A Good Part Of The Day On Your Feet (Teacher, Salesman)</em></label>
				</div>
				<div class="form-check">
					<input type="radio" id="three" value="1.55" v-model="activity_level" />
					<label class="form-check-label" for="three">Moderate Activity - <em>Spend A Good Part Of The Day Doing Physical Activity (Waitress, Mailman)</em></label>
				</div>
				<div class="form-check">
					<input type="radio" id="four" value="1.725" v-model="activity_level" />
					<label class="form-check-label" for="four">High Activity - <em>Spend Most Of The Day Doing Heavy Physical Activity (Messanger, Capenter)</em></label>
				</div>
				<div class="form-check">
					<input type="radio" id="five" value="1.9" v-model="activity_level" />
					<label class="form-check-label" for="five">Extreme Activity - <em>Train In The Gym Daily</em></label>
				</div>
			</div>
		</div>
		<div class="form-group row">
			<label for="deficit" class="col-sm-2 col-form-label">Deficit</label>
			<div class="col-sm-10">
				<select v-model="deficit" id="deficit" class="form-control">
					<option value="15">15%</option>
					<option value="20">20%</option>
					<option value="25">25%</option>
					<option value="30">30%</option>
					<option value="35">35%</option>
					<option value="40">40%</option>
					<option value="45">45%</option>
					<option value="50">50%</option>
				</select>
			</div>
		</div>
		<div class="row">
			<div class="col">
				&nbsp;
			</div>
		</div>
		<div class="form-group row">
			<div class="col">
				<button v-on:click="calculate()" class="btn btn-primary btn-lg btn-block">Calculate</button>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<hr />
				</div>
		</div>
		<div class="row" v-if="seen">
			<div class="col">	
				<h2>Recommended Daily Calorie Intake: {{min_calories}} - {{max_calories}}</h2>
				<h3>Your BMI is : {{bmi}} ({{category}})</h3>
				<small>*Basal Metabolic Rate is calculated by the Harris-Benedict equation (created in 1919, but still applicable today).</small>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  components: {},
  data: function() {
    return {
      seen: false,
      gender: "",
      height: 0,
      cm: 0,
      feet: 0,
      inch: 0,
      weight: 0,
      age: 0,
      activity_level: 0,
      deficit: "",
      bmr: 0,
      min_calories: 0,
      max_calories: 0,
      bmi: 0,
      measurement: "metric",
      weightMeasure: "Kilograms (kg)",
      heightMeasure: "Centimeters (cm)"
    };
  },
  methods: {
    measurements: function() {
      if (this.measurement == "metric") {
        this.weightMeasure = "Kilograms (kg)";
        this.heightMeasure = "Centimeters (cm)";

        this.cm = (this.feet * 30.48 + this.inch * 2.54).toFixed(3);
				this.weight = (this.weight * 0.453592).toFixed(3);
      } else {
        this.weightMeasure = "Pounds (lbs)";
        this.heightMeasure = "Feet and Inches (ft, in)";

        var realFeet = this.cm * 0.3937 / 12;
        var feet = Math.floor(realFeet);
        var inches = ((realFeet - feet) * 12).toFixed(3);
        this.feet = feet;
        this.inch = inches;

				this.weight = (this.weight * 2.20462).toFixed(3);				
      }
    },
    calculate: function() {
			let weight = this.weight;
      if (this.measurement == "imperial") {
        this.height = this.feet * 30.48 + this.inch * 2.54;
        weight = (this.weight * 0.453592).toFixed(3);
      } else {
        this.height = this.cm;
      }

      let bmr = this.bmr;
      let TDEE = 0;
      if (this.gender == "male") {
        bmr =
          66.5 + 13.75 * weight + 5.003 * this.height - 6.755 * this.age;
      } else {
        bmr =
          655.1 + 9.563 * weight + 1.85 * this.height - 4.676 * this.age;
      }
			TDEE = bmr * this.activity_level;
			this.min_calories = Math.ceil(TDEE - this.deficit / 100 * TDEE);
      this.max_calories = Math.ceil(TDEE - (this.deficit / 1.2) / 100 * TDEE);

      this.bmi =
        Math.round(weight / Math.pow(this.height / 100, 2) * 100) / 100;

      this.bmr = bmr;

      if (this.bmi < 16) {
        this.category = "Severe Thinness";
      } else if (between(this.bmi, 16.1, 17)) {
        this.category = "Moderate Thinness";
      } else if (between(this.bmi, 17.1, 18.5)) {
        this.category = "Mild Thinness";
      } else if (between(this.bmi, 18.51, 25)) {
        this.category = "Normal";
      } else if (between(this.bmi, 25.1, 30)) {
        this.category = "Overweight";
      } else if (between(this.bmi, 30.1, 35)) {
        this.category = "Obese Class I";
      } else if (between(this.bmi, 35.1, 40)) {
        this.category = "Obese Class II";
      } else {
        this.category = "Obese Class III";
      }

      this.seen = true;
    }
  }
};

function between(x, min, max) {
  return x >= min && x <= max;
}
</script>
