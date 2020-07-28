<?php

namespace VeloBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Trade
 *
 * @ORM\Table(name="trade")
 * @ORM\Entity(repositoryClass="VeloBundle\Repository\TradeRepository")
 */
class Trade
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
     * @ORM\Column(name="owner", type="integer")
     */
    private $owner;

    /**
     * @var string
     *
     * @ORM\Column(name="tradeType", type="string", length=255)
     */
    private $tradeType;

    /**
     * @var int
     *
     * @ORM\Column(name="tradeIdentifier", type="integer")
     */
    private $tradeIdentifier;

    /**
     * @var string
     *
     * @ORM\Column(name="requestedType", type="string", length=255)
     */
    private $requestedType;

    /**
     * @var string
     *
     * @ORM\Column(name="requestDescription", type="string", length=255)
     */
    private $requestDescription;


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
     * Set owner
     *
     * @param integer $owner
     *
     * @return Trade
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
     * Set tradeType
     *
     * @param string $tradeType
     *
     * @return Trade
     */
    public function setTradeType($tradeType)
    {
        $this->tradeType = $tradeType;

        return $this;
    }

    /**
     * Get tradeType
     *
     * @return string
     */
    public function getTradeType()
    {
        return $this->tradeType;
    }

    /**
     * Set tradeIdentifier
     *
     * @param integer $tradeIdentifier
     *
     * @return Trade
     */
    public function setTradeIdentifier($tradeIdentifier)
    {
        $this->tradeIdentifier = $tradeIdentifier;

        return $this;
    }

    /**
     * Get tradeIdentifier
     *
     * @return int
     */
    public function getTradeIdentifier()
    {
        return $this->tradeIdentifier;
    }

    /**
     * Set requestedType
     *
     * @param string $requestedType
     *
     * @return Trade
     */
    public function setRequestedType($requestedType)
    {
        $this->requestedType = $requestedType;

        return $this;
    }

    /**
     * Get requestedType
     *
     * @return string
     */
    public function getRequestedType()
    {
        return $this->requestedType;
    }

    /**
     * Set requestDescription
     *
     * @param string $requestDescription
     *
     * @return Trade
     */
    public function setRequestDescription($requestDescription)
    {
        $this->requestDescription = $requestDescription;

        return $this;
    }

    /**
     * Get requestDescription
     *
     * @return string
     */
    public function getRequestDescription()
    {
        return $this->requestDescription;
    }
}

