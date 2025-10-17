<?php

class Validate
{
    protected array $data;
    protected array $errors = [];

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public static function make(array $data, array $rules): self
    {
        $validator = new self($data);
        $validator->validate($rules);
        return $validator;
    }

    public function validate(array $rules)
    {
        foreach ($rules as $field => $ruleString) {
            $rulesArr = explode('|', $ruleString);
            foreach ($rulesArr as $rule) {
                $value = $this->data[$field] ?? null;

                if ($rule === 'required' && empty($value)) {
                    $this->errors[$field] = ucfirst($field) . " is required";
                }

                if ($rule === 'email' && $value && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
                    $this->errors[$field] = ucfirst($field) . " must be a valid email";
                }

                if (str_starts_with($rule, 'min:')) {
                    $min = (int)substr($rule, 4);
                    if ($value && strlen($value) < $min) {
                        $this->errors[$field] = ucfirst($field) . " must be at least $min characters";
                    }
                }

                if (str_starts_with($rule, 'max:')) {
                    $max = (int)substr($rule, 4);
                    if ($value && strlen($value) > $max) {
                        $this->errors[$field] = ucfirst($field) . " must only be $max characters";
                    }
                }

                if (str_starts_with($rule, 'in:')) {
                    $allowedValues = explode(',', substr($rule, 3));
                    if ($value && !in_array($value, $allowedValues)) {
                        $allowedList = implode(', ', $allowedValues);
                        $this->errors[$field] = ucfirst($field) . " must be one of: $allowedList";
                    }
                }

                if ($rule === 'date' && $value && !$this->isValidDate($value)) {
                    $this->errors[$field] = ucfirst($field) . " must be a valid date";
                }
            }
        }
    }

    public function fails(): bool
    {
        return !empty($this->errors);
    }

    public function errors(): array
    {
        return $this->errors;
    }

    /**
     * Check if a value is a valid date
     */
    private function isValidDate($date): bool
    {
        if (empty($date)) {
            return false;
        }
        
        $d = DateTime::createFromFormat('Y-m-d', $date);
        return $d && $d->format('Y-m-d') === $date;
    }
}
