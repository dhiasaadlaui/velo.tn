<?php

namespace VeloBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Auction
 *
 * @ORM\Table(name="auction")
 * @ORM\Entity(repositoryClass="VeloBundle\Repository\AuctionRepository")
 */
class Auction
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="creationDate", type="date")
     */
    private $creationDate;

    /**
     * @var string
     *
     * @ORM\Column(name="targetType", type="string", length=255)
     */
    private $targetType;

    /**
     * @var int
     *
     * @ORM\Column(name="targetIdentifier", type="integer")
     */
    private $targetIdentifier;

    /**
     * @var string
     *
     * @ORM\Column(name="status", type="string", length=255)
     */
    private $status;

    /**
     * @var bool
     *
     * @ORM\Column(name="holderConfirmation", type="boolean")
     */
    private $holderConfirmation;

    /**
     * @var bool
     *
     * @ORM\Column(name="clientConfirmation", type="boolean")
     */
    private $clientConfirmation;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set creationDate
     *
     * @param \DateTime $creationDate
     *
     * @return Auction
     */
    public function setCreationDate($creationDate)
    {
        $this->creationDate = $creationDate;

        return $this;
    }

    /**
     * Get creationDate
     *
     * @return \DateTime
     */
    public function getCreationDate()
    {
        return $this->creationDate;
    }

    /**
     * Set targetType
     *
     * @param string $targetType
     *
     * @return Auction
     */
    public function setTargetType($targetType)
    {
        $this->targetType = $targetType;

        return $this;
    }

    /**
     * Get targetType
     *
     * @return string
     */
    public function getTargetType()
    {
        return $this->targetType;
    }

    /**
     * Set targetIdentifier
     *
     * @param integer $targetIdentifier
     *
     * @return Auction
     */
    public function setTargetIdentifier($targetIdentifier)
    {
        $this->targetIdentifier = $targetIdentifier;

        return $this;
    }

    /**
     * Get targetIdentifier
     *
     * @return int
     */
    public function getTargetIdentifier()
    {
        return $this->targetIdentifier;
    }

    /**
     * Set status
     *
     * @param string $status
     *
     * @return Auction
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set holderConfirmation
     *
     * @param boolean $holderConfirmation
     *
     * @return Auction
     */
    public function setHolderConfirmation($holderConfirmation)
    {
        $this->holderConfirmation = $holderConfirmation;

        return $this;
    }

    /**
     * Get holderConfirmation
     *
     * @return bool
     */
    public function getHolderConfirmation()
    {
        return $this->holderConfirmation;
    }

    /**
     * Set clientConfirmation
     *
     * @param boolean $clientConfirmation
     *
     * @return Auction
     */
    public function setClientConfirmation($clientConfirmation)
    {
        $this->clientConfirmation = $clientConfirmation;

        return $this;
    }

    /**
     * Get clientConfirmation
     *
     * @return bool
     */
    public function getClientConfirmation()
    {
        return $this->clientConfirmation;
    }
}

