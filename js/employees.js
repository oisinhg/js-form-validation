import EmployeeFormValidator from "./Classes/EmployeeFormValidator.js";

document.addEventListener("DOMContentLoaded", function (event) {
    let form = document.querySelector('#form-employee');
    let btn = document.querySelector('#btn-submit');

    let table = document.querySelector('#table-employee');
    let tbody = table.querySelector('tbody');
    // let rows = tbody.querySelectorAll('tr');

    btn.addEventListener('click', async function (event) {
        event.preventDefault();

        let validator = new EmployeeFormValidator(form);

        validator.clearErrors();

        let valid = validator.validate();

        if (valid) {
            console.log(validator.data);
            insertTableRow(validator.data);
            form.reset();
        }
        else {
            validator.showErrors();
        }
    });

    function insertTableRow(data) {
        let row = tbody.insertRow();

        for (let i = 0; i < 5; i++) {
            let cell = row.insertCell();
            let text = '';

            switch (i) {
                case 0:
                    text = data.name;
                    break;
                case 1:
                    text = data.ppsn;
                    break;
                case 2:
                    text = data.salary;
                    break;
                case 3:
                    text = getOptionTextByValue('department_id', data.department_id);
                    break;
                case 4:
                    // text = data['project_id[]'];
                    text = getOptionTextByValue('project_id', data['project_id[]']).join(', ');
                    break;
            }

            cell.innerHTML = text;
        }
    }

    function getOptionTextByValue(selectId, values) {
        const select = document.getElementById(selectId);

        const stringValues = Array.isArray(values) ? values.map(String) : [String(values)];

        const result = [];

        for (let option of select.options) {
            if (stringValues.includes(option.value)) {
                result.push(option.text);
            }
        }

        return result;
    }
});