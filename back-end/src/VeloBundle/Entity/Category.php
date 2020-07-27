<?php

namespace VeloBundle\Entity;

use VeloBundle\Entity\TimeStamps\TimeStamps;
use VeloBundle\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use VeloBundle\Entity\Step;
use JMS\Serializer\Annotation\Type;

/**
 * @ORM\Entity(repositoryClass=CategoryRepository::class)
 * @ORM\HasLifecycleCallbacks()
 */
class Category
{
    use TimeStamps;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $categoryName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $categoryImg;


    public function getId()
    {
        return $this->id;
    }

    /**
     * @ORM\ManyToOne(targetEntity="VeloBundle\Entity\Step", cascade={"persist", "remove"})
     * @ORM\JoinColumn(name="step_id", referencedColumnName="id")
     * @Type("VeloBundle\Entity\Step")
     */
    private $step;





    public function __construct()
    {
         $this->events = new ArrayCollection();
    }

    public function getCategoryName()
    {
        return $this->categoryName;
    }

    public function setCategoryName($categoryImg)
    {
        $this->categoryName = $categoryImg;

        return $this;
    }

    public function getCategoryImg()
    {
        return $this->categoryImg;
    }

    public function setCategoryImg($categoryImg)
    {
        $this->categoryImg = $categoryImg;

        return $this;
    }



    public function getStep()
    {
        return $this->step;
    }

    public function setStep($step)
    {

        $this->step = $step;

        return $this;
    }

}
