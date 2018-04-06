<template>
	<div id="app">
		<h2>Macro Calculator</h2>
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
				<input type="number" v-model="height" class="form-control" id="height" />
				<small id="heightHelpBlock" class="form-text text-muted">Measured in Centimeters (cm)</small>
			</div>
		</div>
		<div class="form-group row">
			<label for="weight" class="col-sm-2 col-form-label">Weight</label>
			<div class="col-sm-10">
				<input type="number" v-model="weight" class="form-control" id="weight" />
				<small id="weightHelpBlock" class="form-text text-muted">Measured in Kilograms (kg)</small>
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
					<label class="form-check-label" for="one">Sedentry</label>
				</div>
				<div class="form-check">
					<input type="radio" id="two" value="1.375" v-model="activity_level" />
					<label class="form-check-label" for="two">Light Activity</label>
				</div>
				<div class="form-check">
					<input type="radio" id="three" value="1.55" v-model="activity_level" />
					<label class="form-check-label" for="three">Moderate Activity</label>
				</div>
				<div class="form-check">
					<input type="radio" id="four" value="1.725" v-model="activity_level" />
					<label class="form-check-label" for="four">High Activity</label>
				</div>
				<div class="form-check">
					<input type="radio" id="five" value="1.9" v-model="activity_level" />
					<label class="form-check-label" for="five">Extreme Activity</label>
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
				<hr />
			</div>
		</div>
		<div class="form-group row">
			<label for="activity" class="col-sm-2 col-form-label">Macro<br />(Protien / Carb / Fat)</label>
			<div class="col-sm-10">
				<div class="form-check">
					<input type="radio" id="m1" value="1" v-model="macro" />
					<label class="form-check-label" for="m1">40 / 40 / 20 (Weight loss)</label>
				</div>
				<div class="form-check">
					<input type="radio" id="m2" value="2" v-model="macro" />
					<label class="form-check-label" for="m2">60 / 20 / 20 (Weight Gain)</label>
				</div>
				<div class="form-check">
					<input type="radio" id="m3" value="3" v-model="macro" />
					<label class="form-check-label" for="m3">50 / 40 / 10</label>
				</div>
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
				Recommended Daily Calorie Intake: {{calories}}<br />
				Your BMI is : {{bmi}} ({{category}})<br />
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
      weight: 0,
      age: 0,
      activity_level: 0,
      deficit: "",
      bmr: 0,
      calories: 0,
			bmi: 0,
			macro: ''
    };
  },
  methods: {
    calculate: function() {
      let bmr = this.bmr;
      let TDEE = 0;
      if (this.gender == "male") {
        bmr =
          66.5 + 13.75 * this.weight + 5.003 * this.height - 6.755 * this.age;
      } else {
        bmr =
          655.1 + 9.563 * this.weight + 1.85 * this.height - 4.676 * this.age;
      }
      TDEE = bmr * this.activity_level;
      this.calories = Math.ceil(TDEE - this.deficit / 100 * TDEE);

      this.bmi =
        Math.round(this.weight / Math.pow(this.height / 100, 2) * 100) / 100;

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
