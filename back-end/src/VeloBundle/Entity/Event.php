<?php

namespace VeloBundle\Entity;

use VeloBundle\Repository\EventRepository;
use Doctrine\ORM\Mapping as ORM;
use VeloBundle\Entity\TimeStamps\TimeStamps;
use phpDocumentor\Reflection\Types\Integer;
use Symfony\Component\Form\Extension\Core\Type\NumberType;

/**
 * @ORM\Entity(repositoryClass=EventRepository::class)
 * @ORM\HasLifecycleCallbacks()
 */
class Event
{
    use TimeStamps;
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     */
    private $distance;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $location;

    /**
     * @ORM\Column(type="integer")
     */
    private $startDate;

    /**
     * @ORM\Column(type="integer")
     */
    private $endDate;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $eventName;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isTheme;

    /**
     * @ORM\OneToOne(targetEntity="VeloBundle\Entity\EventConfig", mappedBy="event",  cascade={"persist", "remove"})
     */
    private $eventConfig;

    /**
     *
     * @ORM\ManyToOne(targetEntity="VeloBundle\Entity\Category",inversedBy="events")
      */
    protected $category;


    public function getId()
    {
        return $this->id;
    }

    public function setId(int $id)
    {
        $this->id = $id;

        return $this;
    }

    public function getDistance()
    {
        return $this->distance;
    }

    public function setDistance(float $distance)
    {
        $this->distance = $distance;

        return $this;
    }

    public function getLocation()
    {
        return $this->location;
    }

    public function setLocation(string $location)
    {
        $this->location = $location;

        return $this;
    }

    public function getStartDate()
    {
        return $this->startDate;
    }

    public function setStartDate(int $startDate)
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate()
    {
        return $this->endDate;
    }

    public function setEndDate(int $endDate)
    {
        $this->endDate = $endDate;

        return $this;
    }

    public function getEventName()
    {
        return $this->eventName;
    }

    public function setEventName(string $eventName)
    {
        $this->eventName = $eventName;

        return $this;
    }

    public function getIsTheme()
    {
        return $this->isTheme;
    }

    public function setIsTheme(bool $isTheme)
    {
        $this->isTheme = $isTheme;

        return $this;
    }

    public function getEventConfig()
    {
        return $this->eventConfig;
    }

    public function setEventConfig(EventConfig $eventConfig)
    {
        $this->eventConfig = $eventConfig;

        // set (or unset) the owning side of the relation if necessary
        $newEvent = null === $eventConfig ? null : $this;
        if ($eventConfig->getEvent() !== $newEvent) {
            $eventConfig->setEvent($newEvent);
        }

        return $this;
    }


    public function setCategory(Category $category)
    {
        $this->category = $category;

        return $this;
    }
}
