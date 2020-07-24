<?php

namespace VeloBundle\Entity;

use VeloBundle\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

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
     * @ORM\OneToOne(targetEntity="VeloBundle\Entity\Step", mappedBy="category",  cascade={"persist", "remove"})
     */
    private $step;


    /**
     * @ORM\OneToMany(targetEntity="VeloBundle\Entity\Event", mappedBy="category",  fetch="EXTRA_LAZY")
     */
    protected $events;


    public function __construct()
    {
        $this->stepsCatalogue = new ArrayCollection();
        $this->events = new ArrayCollection();
    }

    public function getCategoryName()
    {
        return $this->categoryName;
    }

    public function setCategoryName(string $categoryImg)
    {
        $this->categoryName = $categoryImg;

        return $this;
    }

    public function getCategoryImg()
    {
        return $this->categoryImg;
    }

    public function setCategoryImg(string $categoryImg)
    {
        $this->categoryImg = $categoryImg;

        return $this;
    }

    /**
     * @return Collection|Step[]
     */
    public function getStepsCatalogue()
    {
        return $this->stepsCatalogue;
    }

    public function addStepsCatalogue(Step $stepsCatalogue)
    {
        if (!$this->stepsCatalogue->contains($stepsCatalogue)) {
            $this->stepsCatalogue[] = $stepsCatalogue;
        }

        return $this;
    }

    public function removeStepsCatalogue(Step $stepsCatalogue)
    {
        if ($this->stepsCatalogue->contains($stepsCatalogue)) {
            $this->stepsCatalogue->removeElement($stepsCatalogue);
        }

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
}
