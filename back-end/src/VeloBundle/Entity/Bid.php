<?php

namespace VeloBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Bid
 *
 * @ORM\Table(name="bid")
 * @ORM\Entity(repositoryClass="VeloBundle\Repository\BidRepository")
 */
class Bid
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
     * @var int
     *
     * @ORM\Column(name="bid", type="integer")
     */
    private $bid;

    /**
     * @var int
     *
     * @ORM\Column(name="owner", type="integer")
     */
    private $owner;

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
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set bid
     *
     * @param integer $bid
     *
     * @return Bid
     */
    public function setBid($bid)
    {
        $this->bid = $bid;

        return $this;
    }

    /**
     * Get bid
     *
     * @return int
     */
    public function getBid()
    {
        return $this->bid;
    }

    /**
     * Set owner
     *
     * @param integer $owner
     *
     * @return Bid
     */
    public function setOwner($owner)
    {
        $this->owner = $owner;

        return $this;
    }

    /**
     * Get owner
     *
     * @return int
     */
    public function getOwner()
    {
        return $this->owner;
    }

    /**
     * Set targetType
     *
     * @param string $targetType
     *
     * @return Bid
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
     * @return Bid
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
     * @return Bid
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
}

