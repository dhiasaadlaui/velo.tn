<?php

namespace VeloBundle\Entity;

use VeloBundle\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use VeloBundle\Entity\Step;
use JMS\Serializer\Annotation\Type;

/**
 * @ORM\Entity(repositoryClass=CategoryRepository::class)
 */
class Category
{
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


    /**
     * @ORM\OneToMany(targetEntity="VeloBundle\Entity\Event", mappedBy="category",  fetch="EXTRA_LAZY")
     */
    protected $events;


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


    /**
     * @return Collection|Event[]
     */
    public function getEvents()
    {
        return $this->events;
    }

    public function addEvent(Event $event)
    {
        if (!$this->events->contains($event)) {
            $this->events[] = $event;
            $event->setCategory($this);
        }

        return $this;
    }

    public function removeEvent(Event $event)
    {
        if ($this->events->contains($event)) {
            $this->events->removeElement($event);
            // set the owning side to null (unless already changed)
            if ($event->getCategory() === $this) {
                $event->setCategory(null);
            }
        }

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
