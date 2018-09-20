<template>

    <form>
        <div class="row py-5 mx-4 ">


            <!--gender-->
            <div class="col-12 col-md-7 py-md-3">
                <p>Neme</p>
            </div>
            <div class="col-12 col-md-5 py-md-3 mb-3">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="male" required v-model="fields.gender">
                    <label class="form-check-label" for="inlineRadio1">Férfi</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="female" required v-model="fields.gender">
                    <label class="form-check-label" for="inlineRadio2">Nő</label>
                </div>
            </div>

            <!-- country -->
            <div class="col-12 col-md-7 py-md-3">
                <p>Melyik megyében végzi a munkáját?</p>
            </div>
            <div class="col-12 col-md-5 py-md-3 mb-3">
                <input type="text" class="form-control" required v-model="fields.country">
            </div>

            <!-- sector -->
            <div class="col-12 col-md-7 py-md-3">
                <p>Melyik ágazatban dolgozik?</p>
            </div>
            <div class="col-12 col-md-5 py-md-3 mb-3">
                <select :value="null" class="form-control" required  v-model="fields.sector">
                    <option selected>Válassz</option>
                    <option value="Informatika">Informatika</option>
                    <option value="Bank és pénzügy">Bank és pénzügy</option>
                    <option value="Vendéglátás">Vendéglátás</option>
                </select>
            </div>

            <!-- job -->
            <div class="col-12 col-md-7 py-md-3">
                <p>Milyen munkakörben dolgozik?</p>
            </div>
            <div class="col-12 col-md-5 py-md-3 mb-3">
                <input type="text" class="form-control" required v-model="fields.job">
            </div>

            <!-- income -->
            <div class="col-12 col-md-7 py-md-3">
                <p>Mennyi a havi bruttó keresete?</p>
            </div>
            <div class="col-12 col-md-5 py-md-3 mb-3">
                <div class="form-row">
                    <div class="col-md-6 mb-3">
                        <input type="number" class="form-control" required v-model="fields.income">
                    </div>
                </div>
            </div>

            <!-- submit -->
            <div class="col text-center my-5">
                <button class="btn btn-outline-success" type="submit" @click="Submit">Elküldöm</button>
            </div>

            <!-- alerts -->
            <div class="col-12">
                <div class="alert alert-success" role="alert" v-if="alerts.success">
                    Köszönjük sikeresen elküldtük a válaszod!<br>
                    Az alábbi oldalon megtekintheted az eddigi statisztikáinkat:
                    <router-link to="/statistics">Link</router-link>
                </div>
                <div class="alert alert-danger" role="alert" v-if="alerts.danger">
                    Nem sikerült elküldenünk az adatokat, kérlek írj nekünk a hba körülményeiről: <br>
                    <a href="mailto:support@fizu.hu">support@fizu.hu</a>
                </div>
            </div>

        </div>
    </form>

</template>
<script>
import DataService from '../DataService';

export default {
    data() {
        return {
            fields: {
                gender: null,
                country: null,
                income: null,
                job: null,
                sector: null
            },
            alerts: {
                success: false,
                danger: false
            }
        };
    },
    methods: {
        Submit(event) {
            let valueCollection = Object.values(this.fields)

            let missingvalues = valueCollection.filter(value => {
                return !value;
            });

            if (missingvalues.length == 0) {
                event.preventDefault();
                DataService.PostSurveyResponse(this.fields).then(success => {
                    if (success) {
                        this.ShowSuccessAlert();
                    } else {
                        this.ShowDangerAlert();
                    }
                });
            }

            this.fields = '';
        },

        ShowSuccessAlert() {
            this.alerts.success = true;
        },
        ShowDangerAlert() {
            this.alerts.danger = true;
        },
        HideAllAlert() {
            this.alerts.success = false;
            this.alerts.danger = false;
        }
    }
};
</script>