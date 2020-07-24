<?php

namespace VeloBundle\Entity;

use VeloBundle\Repository\EventConfigRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=EventConfigRepository::class)
 */
class EventConfig
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $rep;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $dateRep;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $status;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $commentPermession;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $showInviteList;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $isArchived;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $showDate;

    /**
     * @ORM\OneToOne(targetEntity="VeloBundle\Entity\Event", inversedBy="eventConfig")
     */
    private $event;


    public function getId()
    {
        return $this->id;
    }

    public function getRep()
    {
        return $this->rep;
    }

    public function setRep(int $rep)
    {
        $this->rep = $rep;

        return $this;
    }

    public function getDateRep()
    {
        return $this->dateRep;
    }

    public function setDateRep(int $dateRep)
    {
        $this->dateRep = $dateRep;

        return $this;
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function setStatus(string $status)
    {
        $this->status = $status;

        return $this;
    }

    public function getCommentPermession()
    {
        return $this->commentPermession;
    }

    public function setCommentPermession(bool $commentPermession)
    {
        $this->commentPermession = $commentPermession;

        return $this;
    }

    public function getShowInviteList()
    {
        return $this->showInviteList;
    }

    public function setShowInviteList(bool $showInviteList)
    {
        $this->showInviteList = $showInviteList;

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

    public function getShowDate()
    {
        return $this->showDate;
    }

    public function setShowDate(int $showDate)
    {
        $this->showDate = $showDate;

        return $this;
    }

    public function getEvent()
    {
        return $this->event;
    }

    public function setEvent(Event $event)
    {
        $this->event = $event;

        return $this;
    }

}
