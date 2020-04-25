const EMAIL_VALIDATION_REG_EXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const firstNameInput = document.querySelector('input[name="first-name"]');
const lastNameInput = document.querySelector('input[name="last-name"]');
const emailInput = document.querySelector('input[name="email"]');
const passwordInput = document.querySelector('input[name="password"]');

const form = document.querySelector('form');

const inputs = [
  {
    element: firstNameInput,
    valid: false,
    touched: false
  },
  {
    element: lastNameInput,
    valid: false,
    touched: false
  },
  {
    element: emailInput,
    valid: false,
    touched: false,
    email: true
  },
  {
    element: passwordInput,
    valid: false,
    touched: false
  },
];

const validateInput = (input, submitted = false) => {
  const value = input.element.value.trim();
  let valid = !!value;

  if (input.email) {
    valid = valid && EMAIL_VALIDATION_REG_EXP.test(value);
  }

  if (!valid && (input.touched || submitted)) {
    input.element.parentElement.classList.add('form__group--invalid');
  } else {
    input.element.parentElement.classList.remove('form__group--invalid');
  }
};

// registering event listeners for individual inputs
for(const input of inputs) {
  input.element.addEventListener('blur', () => {
    input.touched = true;
    validateInput(input);
  });

  input.element.addEventListener('change', () => validateInput(input));
}

// form submission handling
form.addEventListener('submit', (event) => {
  event.preventDefault();
  for(const input of inputs) {
    validateInput(input, true);
  }
});