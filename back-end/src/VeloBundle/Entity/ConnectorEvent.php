<?php

namespace VeloBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Type;

/**
 * ConnectorEvent
 *
 * @ORM\Table(name="connector_event")
 * @ORM\Entity(repositoryClass="VeloBundle\Repository\ConnectorEventRepository")
 */
class ConnectorEvent
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
     * @ORM\Column(name="sourcePointX", type="integer")
     */
    private $sourcePointX;

    /**
     * @var int
     *
     * @ORM\Column(name="sourcePointY", type="integer")
     */
    private $sourcePointY;

    /**
     * @var int
     *
     * @ORM\Column(name="targetPointX", type="integer")
     */
    private $targetPointX;

    /**
     * @var int
     *
     * @ORM\Column(name="targetPointY", type="integer")
     */
    private $targetPointY;


    /**
     * @ORM\ManyToOne(targetEntity="VeloBundle\Entity\EventConfig", cascade={"persist", "remove"})
     * @ORM\JoinColumn(name="config_id", referencedColumnName="id")
     * @Type("VeloBundle\Entity\EventConfig")
     */
    private $eventConfig;


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
     * Set sourcePointX
     *
     * @param integer $sourcePointX
     *
     * @return ConnectorEvent
     */
    public function setSourcePointX($sourcePointX)
    {
        $this->sourcePointX = $sourcePointX;

        return $this;
    }

    /**
     * Get sourcePointX
     *
     * @return int
     */
    public function getSourcePointX()
    {
        return $this->sourcePointX;
    }

    /**
     * Set sourcePointY
     *
     * @param integer $sourcePointY
     *
     * @return ConnectorEvent
     */
    public function setSourcePointY($sourcePointY)
    {
        $this->sourcePointY = $sourcePointY;

        return $this;
    }

    /**
     * Get sourcePointY
     *
     * @return int
     */
    public function getSourcePointY()
    {
        return $this->sourcePointY;
    }

    /**
     * Set targetPointX
     *
     * @param integer $targetPointX
     *
     * @return ConnectorEvent
     */
    public function setTargetPointX($targetPointX)
    {
        $this->targetPointX = $targetPointX;

        return $this;
    }

    /**
     * Get targetPointX
     *
     * @return int
     */
    public function getTargetPointX()
    {
        return $this->targetPointX;
    }

    /**
     * Set targetPointY
     *
     * @param integer $targetPointY
     *
     * @return ConnectorEvent
     */
    public function setTargetPointY($targetPointY)
    {
        $this->targetPointY = $targetPointY;

        return $this;
    }

    /**
     * Get targetPointY
     *
     * @return int
     */
    public function getTargetPointY()
    {
        return $this->targetPointY;
    }


    public function getEventConfig()
    {
        return $this->eventConfig;
    }

    public function setEventConfig($eventConfig)
    {

        $this->eventConfig = $eventConfig;

        return $this;
    }
}

