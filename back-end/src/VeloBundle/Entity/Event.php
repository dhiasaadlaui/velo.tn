<?php

namespace VeloBundle\Entity;

use Doctrine\Common\Collections\Collection;
use VeloBundle\Entity\User;
use VeloBundle\Repository\EventRepository;
use Doctrine\ORM\Mapping as ORM;
use VeloBundle\Entity\TimeStamps\TimeStamps;
use phpDocumentor\Reflection\Types\Integer;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use JMS\Serializer\Annotation\Type;

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
     * @ORM\Column(type="string", length=255)
     */
    private $startDate;

    /**
     * @ORM\Column(type="string", length=255)
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
     * @ORM\Column(type="boolean")
     */
    private $isArchived;

    /**
     * @ORM\Column(type="integer")
     */
    private $rate;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $creatorUserId;

    /**
     * @ORM\OneToOne(targetEntity="VeloBundle\Entity\EventConfig", cascade={"persist", "remove"})
     * @ORM\JoinColumn(name="config_id", referencedColumnName="id" , )
     * @Type("VeloBundle\Entity\EventConfig")
     */
    private $eventConfig;

    /**
     * @ORM\ManyToOne(targetEntity="VeloBundle\Entity\Category", cascade={"persist", "remove"})
     * @ORM\JoinColumn(name="category_id", referencedColumnName="id")
     * @Type("VeloBundle\Entity\Category")
     */
    private $category;


    /**
     * @var \Doctrine\Common\Collections\Collection|\VeloBundle\Entity\User[]
     *
     * @ORM\ManyToMany(targetEntity="VeloBundle\Entity\User", mappedBy="subscribedEvents")
     */
    protected $subscribers;


    /**
     * @ORM\OneToMany(targetEntity="VeloBundle\Entity\CommentEvent", mappedBy="event" )
     */
    protected $comments;


    public function getId()
    {
        return $this->id;
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

    public function setStartDate(string $startDate)
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate()
    {
        return $this->endDate;
    }

    public function setEndDate(string $endDate)
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


    public function getCreatorUserId()
    {
        return $this->creatorUserId;
    }

    public function setCreatorUserId(string $creatorUserId)
    {
        $this->creatorUserId = $creatorUserId;

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


    public function getIsArchived()
    {
        return $this->isArchived;
    }

    public function setIsArchived(bool $isArchived)
    {
        $this->isArchived = $isArchived;

        return $this;
    }

    public function getRate()
    {
        return $this->rate;
    }

    public function setRate(int $rate)
    {
        $this->rate = $rate;

        return $this;
    }

    public function getEventConfig()
    {
        return $this->eventConfig;
    }

    public function setEventConfig(EventConfig $eventConfig)
    {
        $this->eventConfig = $eventConfig;
        return $this;
    }


    public function setCategory(Category $category)
    {
        $this->category = $category;
    }

    public function getCategory()
    {
        return $this->category;
    }

    /**
     * @return Collection|\VeloBundle\Entity\User[]
     */
    public function getSubscribers()
    {
        return $this->subscribers;
    }

    public function addSubscriber(\VeloBundle\Entity\User $subscriber)
    {
        if (!$this->subscribers->contains($subscriber)) {
            $this->subscribers[] = $subscriber;
            $subscriber->addSubscribedEvent($this);
        }

        return $this;
    }

    public function removeSubscriber(\VeloBundle\Entity\User $subscriber)
    {
        if ($this->subscribers->contains($subscriber)) {
            $this->subscribers->removeElement($subscriber);
            $subscriber->removeSubscribedEvent($this);
        }

        return $this;
    }

    /**
     * @return Collection|CommentEvent[]
     */
    public function getComments()
    {
        return $this->comments;
    }

    public function addComment(CommentEvent $comment)
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setEvent($this);
        }

        return $this;
    }
}
