<?php

namespace VeloBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Type;
use VeloBundle\Entity\TimeStamps\TimeStamps;

/**
 * NodeEvent
 *
 * @ORM\Table(name="node_event")
 * @ORM\Entity(repositoryClass="VeloBundle\Repository\NodeEventRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class NodeEvent
{
    use TimeStamps;

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
     * @ORM\Column(name="positionX", type="integer")
     */
    private $positionX;

    /**
     * @var int
     *
     * @ORM\Column(name="positionY", type="integer")
     */
    private $positionY;


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
     * Set positionX
     *
     * @param integer $positionX
     *
     * @return NodeEvent
     */
    public function setPositionX($positionX)
    {
        $this->positionX = $positionX;

        return $this;
    }

    /**
     * Get positionX
     *
     * @return int
     */
    public function getPositionX()
    {
        return $this->positionX;
    }

    /**
     * Set positionY
     *
     * @param integer $positionY
     *
     * @return NodeEvent
     */
    public function setPositionY($positionY)
    {
        $this->positionY = $positionY;

        return $this;
    }

    /**
     * Get positionY
     *
     * @return int
     */
    public function getPositionY()
    {
        return $this->positionY;
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

