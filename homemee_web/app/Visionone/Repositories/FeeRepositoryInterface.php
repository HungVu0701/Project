<?php

namespace Visionone\Repositories;

interface FeeRepositoryInterface
{
    public function findAll($month);

    public function findApi($residentId, $year);

    public function sendSms($feeId);

    public function publish($feeId);

    public function getFeeForm();

    public function uploadListFee($data);
}
