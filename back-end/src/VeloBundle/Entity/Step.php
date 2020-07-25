<?php

namespace VeloBundle\Entity;

use VeloBundle\Repository\StepRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

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
     * @ORM\Column(type="boolean", length=255)
     */

    private $title;

    /**
     * @ORM\Column(type="boolean", length=255)
     */

    private $locationSart;

    /**
     * @ORM\Column(type="boolean", length=255)
     */

    private $locationEnd;


    /**
     * @ORM\Column(type="boolean", length=255)
     */

    private $startDay;

    /**
     * @ORM\Column(type="boolean", length=255)
     */

    private $endDay;

    /**
     * @ORM\Column(type="boolean", length=255)
     */

    private $repeat;

    /**
     * @ORM\Column(type="boolean", length=255)
     */

    private $endRepeat;

    /**
     * @ORM\Column(type="boolean", length=255)
     */

    private $rule;

    /**
     * @ORM\Column(type="boolean", length=255)
     */

    private $gender;

    /**
     * @ORM\Column(type="boolean", length=255)
     */

    private $age;

    /**
     * @ORM\Column(type="boolean", length=255)
     */

    private $difficulty;

    /**
     * @ORM\Column(type="boolean", length=255)
     */

    private $diagrame;

    /**
     * @ORM\Column(type="boolean", length=255)
     */

    private $theme;

    /**
     * @ORM\Column(type="boolean", length=255)
     */

    private $associationName;

    /**
     * @ORM\OneToOne(targetEntity="VeloBundle\Entity\Category", inversedBy="step")
     */
    private $category;

    public function __construct()
    {
        $this->categories = new ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle(boolean $title)
    {
        $this->title = $title;

        return $this;
    }

    public function getLocationSart()
    {
        return $this->locationSart;
    }

    public function setLocationSart(boolean $locationSart)
    {
        $this->locationSart = $locationSart;

        return $this;
    }


    public function getLocationEnd()
    {
        return $this->locationEnd;
    }

    public function setLocationEnd(boolean $locationEnd)
    {
        $this->locationEnd = $locationEnd;

        return $this;
    }

    public function getStartDay()
    {
        return $this->startDay;
    }

    public function setStartDay(boolean $startDay)
    {
        $this->startDay = $startDay;

        return $this;
    }

    public function getEndDay()
    {
        return $this->endDay;
    }

    public function setEndDay(boolean $endDay)
    {
        $this->endDay = $endDay;

        return $this;
    }

    public function getRepeat()
    {
        return $this->repeat;
    }

    public function setRepeat(boolean $repeat)
    {
        $this->repeat = $repeat;

        return $this;
    }

    public function getEndRepeat()
    {
        return $this->endRepeat;
    }

    public function setEndRepeat(boolean $endRepeat)
    {
        $this->endRepeat = $endRepeat;

        return $this;
    }

    public function getRule()
    {
        return $this->rule;
    }

    public function setRule(boolean $rule)
    {
        $this->rule = $rule;

        return $this;
    }

    public function getGender()
    {
        return $this->gender;
    }

    public function setGender(boolean $gender)
    {
        $this->gender = $gender;

        return $this;
    }

    public function getAge()
    {
        return $this->age;
    }

    public function setAge(boolean $age)
    {
        $this->age = $age;

        return $this;
    }

    public function getDifficulty()
    {
        return $this->difficulty;
    }

    public function setDifficulty(boolean $difficulty)
    {
        $this->difficulty = $difficulty;

        return $this;
    }

    public function getDiagrame()
    {
        return $this->diagrame;
    }

    public function setDiagrame(boolean $diagrame)
    {
        $this->diagrame = $diagrame;

        return $this;
    }

    public function getTheme()
    {
        return $this->theme;
    }

    public function setTheme(boolean $theme)
    {
        $this->theme = $theme;

        return $this;
    }

    public function getAssociationName()
    {
        return $this->associationName;
    }

    public function setAssociationName(boolean $associationName)
    {
        $this->associationName = $associationName;

        return $this;
    }


}
