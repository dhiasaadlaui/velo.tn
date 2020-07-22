<?php

namespace VeloBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Volonteer
 *
 * @ORM\Table(name="volonteer")
 * @ORM\Entity(repositoryClass="VeloBundle\Repository\VolonteerRepository")
 */
class Volonteer extends User
{
    /**
     * @var boolean
     *
     * @ORM\Column(name="isVolunteer", type="boolean", length=255)
     */
    private $isVolunteer;

    /**
     * @ORM\OneToMany(targetEntity="VeloBundle\Entity\Disponibility", mappedBy="volunteer" , cascade={"persist", "remove"})
     */
    private $disponibility;
    /**
     * @var int
     *
     * @ORM\Column(name="points", type="integer")
     */
    private $points;

    /**
     * Set points
     *
     * @param integer $points
     *
     * @return Volonteer
     */
    public function setPoints($points)
    {
        $this->points = $points;

        return $this;
    }

    /**
     * Get points
     *
     * @return int
     */
    public function getPoints()
    {
        return $this->points;
    }

    /**
     * @return mixed
     */
    public function getIsVolunteer()
    {
        return $this->isVolunteer;
    }

    /**
     * @param mixed $isVolunteer
     */
    public function setIsVolunteer($isVolunteer)
    {
        $this->isVolunteer = $isVolunteer;
    }

    /**
     * @return mixed
     */
    public function getDisponibility()
    {
        return $this->disponibility;
    }

    /**
     * @param mixed $disponibility
     */
    public function setDisponibility($disponibility)
    {
        $this->disponibility = $disponibility;
    }



}

