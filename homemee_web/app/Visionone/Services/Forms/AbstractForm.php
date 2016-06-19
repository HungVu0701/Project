<?php

namespace Visionone\Services\Forms;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Validator;

abstract class AbstractForm
{
    /**
     * The input data of the current request.
     *
     * @var array
     */
    protected $inputData;

    /**
     * The validation rules to validate the input data against.
     *
     * @var array
     */
    protected $rules = [];
    protected $url_rules = [];
    protected $rules_update = [];
    /**
     * The validator instance.
     *
     * @var \Illuminate\Validation\Validator
     */
    protected $validator;

    protected $messages = [];

    public function __construct()
    {
        $this->inputData = App::make('request')->all();
        unset($this->inputData['vision_one_token']);
    }

    /**
     * Get the prepared input data.
     *
     * @return array
     */
    public function getInputData()
    {
        return $this->inputData;
    }

    public function setInputData($key,$data)
    {
        return $this->inputData[$key] = $data;
    }

    /**
     * Returns whether the input data is valid.
     *
     * @return bool
     */
    public function isCreateValid()
    {
        $this->validator = \Validator::make(
            $this->getInputData(),
            $this->getPreparedCreateRules(),
            $this->getMessages()
        );

        return $this->validator->passes();
    }

    /**
     * Returns whether the input data is valid.
     *
     * @return bool
     */
    public function isDeleteValid($data)
    {
        $this->validator = \Validator::make(
            $data,
            $this->getPreparedDeleteRules(),
            $this->getMessages()
        );

        return $this->validator->passes();
    }

    public function isUpdateValid()
    {
        $this->validator = \Validator::make(
            $this->getInputData(),
            $this->getPreparedUpdateRules(),
            $this->getMessages()
        );

        return $this->validator->passes();
    }
    /**
     * Get the validation errors off of the Validator instance.
     *
     * @return \Illuminate\Support\MessageBag
     */
    public function getErrors()
    {
        $error = json_decode($this->validator->errors(), true);
        if (count($error) > 0) {
            foreach($error as $key => $value) {
                return $value[0];
            }
        } else {
            return $error;
        }
    }

    /**
     * Get the prepared validation rules.
     *
     * @return array
     */
    protected function getPreparedCreateRules()
    {
        return $this->rules;
    }

    protected function getPreparedUpdateRules()
    {
        return $this->rules_update;
    }

    /**
     * Get the prepared validation rules.
     *
     * @return array
     */
    protected function getPreparedDeleteRules()
    {
        return $this->url_rules;
    }
    /**
     * Get the custom validation messages.
     *
     * @return array
     */
    protected function getMessages()
    {
        return $this->messages;
    }
}
