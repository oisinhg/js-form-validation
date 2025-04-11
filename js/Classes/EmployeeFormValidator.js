import FormValidator from "./FormValidator.js";

class EmployeeFormValidator extends FormValidator {
    constructor(_form) {
        super(_form);
    }

    validate() {
        // name
        if (!this.isPresent("name")) {
            this.errors['name'] = 'Name is required';
        }
        else if (!this.minLength("name", 6)) {
            this.errors['name'] = "Name must be at least 6 characters";
        }

        // ppsn
        if (!this.isPresent("ppsn")) {
            this.errors['ppsn'] = "You must enter a PPSN";
        }
        else if (!this.minLength("ppsn", 8)) {
            this.errors['ppsn'] = "PPSN must be at least 8 characters";
        }
        else if (!this.isMatch("ppsn", /^[0-9]{7,}[A-Z]{1,2}$/)) {
            this.errors['ppsn'] = "PPSN must have 7 digits followed by 1 or 2 uppercase letters";
        }

        // salary
        if (!this.isPresent('salary')) {
            this.errors['salary'] = "Please enter a salary";
        }
        else if (!this.isMatch('salary', /^[0-9]*$/)) {
            this.errors['salary'] = "Salary must contain only digits";
        }

        // department
        let validDepartmentIDs = this.getOptions('#department_id', true);
        if (!this.isPresent('department_id')) {
            this.errors['department_id'] = 'Department required';
        }
        else if (!this.isElement('department_id', validDepartmentIDs)) {
            this.errors['department_id'] = "Invalid department selected";
        }

        // projects
        let validProjectIDs = this.getOptions('#project_id');
        if (!this.isPresent('project_id[]')) {
            this.errors['project_id'] = 'Project required';
        }
        else if (!this.isElement('project_id[]', validProjectIDs)) {
            this.errors['project_id'] = "Invalid project";
        }

        return Object.keys(this.errors).length === 0;
    }
}

export default EmployeeFormValidator;