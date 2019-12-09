class Validator {
    constructor(value) {
        this.isValid = true;
        this.value = value;
    }

    isEmail() {
        if (this.isValid) {
            this.isValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.value);
        }
        return this;
    }

    minLength(val) {
        if (this.isValid) {
            this.isValid = this.value.length >= val;
        }
        return this;
    }

    maxLength(val) {
        if (this.isValid) {
            this.isValid = this.value.length <= val;
        }
        return this;
    }

    end() {
        return this.isValid;
    }
}

export default (value => new Validator(value));
