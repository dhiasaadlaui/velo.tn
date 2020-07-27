<?php

namespace VeloBundle\Entity;

use VeloBundle\Repository\StepRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Type;

/**
 * @ORM\Entity(repositoryClass=StepRepository::class)
 */
class Step
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;


    /**
     * @ORM\Column(name="title", type="boolean")
     */


    private $title;


    /**
     * @ORM\Column(name="locationstart", type="boolean")
     */


    private $locationStart;


    /**
     * @ORM\Column(name="locationend", type="boolean")
     */


    private $locationEnd;


    /**
     * @ORM\Column(name="startday", type="boolean")
     */


    private $startDay;

    /**
     * @ORM\Column(name="endday", type="boolean")
     */


    private $endDay;

    /**
     * @ORM\Column(name="rep", type="boolean")
     */


    private $rep;


    /**
     * @ORM\Column(name="endrepeat", type="boolean")
     */


    private $endRepeat;

    /**
     * @ORM\Column(name="rule", type="boolean")
     */


    private $rule;

    /**
     * @ORM\Column(name="gender", type="boolean")
     */


    private $gender;


    /**
     * @ORM\Column(name="age", type="boolean")
     */


    private $age;

    /**
     * @ORM\Column(name="difficulty", type="boolean")
     */


    private $difficulty;

    /**
     * @ORM\Column(name="diagrame", type="boolean")
     */


    private $diagrame;

    /**
     * @ORM\Column(name="theme", type="boolean")
     */


    private $theme;

    /**
     * @ORM\Column(name="associationname", type="boolean")
     */


    private $associationName;



    public function getId()
    {
        return $this->id;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    public function getLocationStart()
    {
        return $this->locationStart;
    }

    public function setLocationStart($locationStart)
    {
        $this->locationStart = $locationStart;

        return $this;
    }

    public function getLocationEnd()
    {
        return $this->locationEnd;
    }

    public function setLocationEnd($locationEnd)
    {
        $this->locationEnd = $locationEnd;

        return $this;
    }

    public function getStartDay()
    {
        return $this->startDay;
    }

    public function setStartDay($startDay)
    {
        $this->startDay = $startDay;

        return $this;
    }


    public function getEndDay()
    {
        return $this->endDay;
    }

    public function setEndDay($endDay)
    {
        $this->endDay = $endDay;

        return $this;
    }

    public function getRepeat()
    {
        return $this->rep;
    }

    public function setRepeat($repeat)
    {
        $this->rep = $repeat;

        return $this;
    }

    public function getEndRepeat()
    {
        return $this->endRepeat;
    }

    public function setEndRepeat($endRepeat)
    {
        $this->endRepeat = $endRepeat;

        return $this;
    }

    public function getRule()
    {
        return $this->rule;
    }

    public function setRule($rule)
    {
        $this->rule = $rule;

        return $this;
    }

    public function getGender()
    {
        return $this->gender;
    }

    public function setGender($gender)
    {
        $this->gender = $gender;

        return $this;
    }


    public function getAge()
    {
        return $this->age;
    }

    public function setAge($age)
    {
        $this->age = $age;

        return $this;
    }


    public function getDifficulty()
    {
        return $this->difficulty;
    }

    public function setDifficulty($difficulty)
    {
        $this->difficulty = $difficulty;

        return $this;
    }

    public function getDiagrame()
    {
        return $this->diagrame;
    }

    public function setDiagrame($diagrame)
    {
        $this->diagrame = $diagrame;

        return $this;
    }

    public function getTheme()
    {
        return $this->theme;
    }

    public function setTheme($theme)
    {
        $this->theme = $theme;

        return $this;
    }

    public function getAssociationName()
    {
        return $this->associationName;
    }

    public function setAssociationName($associationName)
    {
        $this->associationName = $associationName;

        return $this;
    }





}
