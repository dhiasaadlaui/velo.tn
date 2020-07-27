<?php

namespace VeloBundle\Entity;

use Twig\Node\Node;
use VeloBundle\Entity\TimeStamps\TimeStamps;
use VeloBundle\Repository\EventConfigRepository;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Type;

/**
 * @ORM\Entity(repositoryClass=EventConfigRepository::class)
 * @ORM\HasLifecycleCallbacks()
 */
class EventConfig
{
    use TimeStamps;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;


    /**
     * @ORM\Column(name="locationstart", type="string", nullable=true)
     */


    private $locationStart;


    /**
     * @ORM\Column(name="locationend", type="string", nullable=true)
     */


    private $locationEnd;


    /**
     * @ORM\Column(name="startday", type="string", nullable=true)
     */


    private $startDay;

    /**
     * @ORM\Column(name="endday", type="string", nullable=true)
     */


    private $endDay;

    /**
     * @ORM\Column(name="rep", type="string", nullable=true)
     */


    private $rep;


    /**
     * @ORM\Column(name="endrepeat", type="string", nullable=true)
     */


    private $endRepeat;

    /**
     * @ORM\Column(name="rule", type="string", nullable=true)
     */


    private $rule;

    /**
     * @ORM\Column(name="gender", type="string", nullable=true)
     */


    private $gender;


    /**
     * @ORM\Column(name="age", type="string", nullable=true)
     */


    private $age;

    /**
     * @ORM\Column(name="difficulty", type="string", nullable=true)
     */


    private $difficulty;


    /**
     * @ORM\Column(name="theme", type="string", nullable=true)
     */

    private $theme;

    /**
     * @ORM\Column(name="associationname", type="string", nullable=true)
     */
    private $associationName;

    /**
     * @ORM\OneToMany(targetEntity="VeloBundle\Entity\NodeEvent", mappedBy="eventConfig" ,cascade={"persist", "remove"})
     */
    protected $nodes;


    /**
     * @ORM\OneToMany(targetEntity="VeloBundle\Entity\ConnectorEvent", mappedBy="eventConfig" , cascade={"persist", "remove"} )
     */
    protected $conectors;


    public function getId()
    {
        return $this->id;
    }


    public function getLocationStart()
    {
        return $this->locationStart;
    }

    public function setLocationStart($locationStart)
    {
        $this->locationStart = $locationStart;

        return $this;
    }

    public function getLocationEnd()
    {
        return $this->locationEnd;
    }

    public function setLocationEnd($locationEnd)
    {
        $this->locationEnd = $locationEnd;

        return $this;
    }

    public function getStartDay()
    {
        return $this->startDay;
    }

    public function setStartDay($startDay)
    {
        $this->startDay = $startDay;

        return $this;
    }


    public function getEndDay()
    {
        return $this->endDay;
    }

    public function setEndDay($endDay)
    {
        $this->endDay = $endDay;

        return $this;
    }

    public function getRepeat()
    {
        return $this->rep;
    }

    public function setRepeat($repeat)
    {
        $this->rep = $repeat;

        return $this;
    }

    public function getEndRepeat()
    {
        return $this->endRepeat;
    }

    public function setEndRepeat($endRepeat)
    {
        $this->endRepeat = $endRepeat;

        return $this;
    }

    public function getRule()
    {
        return $this->rule;
    }

    public function setRule($rule)
    {
        $this->rule = $rule;

        return $this;
    }

    public function getGender()
    {
        return $this->gender;
    }

    public function setGender($gender)
    {
        $this->gender = $gender;

        return $this;
    }


    public function getAge()
    {
        return $this->age;
    }

    public function setAge($age)
    {
        $this->age = $age;

        return $this;
    }


    public function getDifficulty()
    {
        return $this->difficulty;
    }

    public function setDifficulty($difficulty)
    {
        $this->difficulty = $difficulty;

        return $this;
    }


    public function getTheme()
    {
        return $this->theme;
    }

    public function setTheme($theme)
    {
        $this->theme = $theme;

        return $this;
    }

    public function getAssociationName()
    {
        return $this->associationName;
    }

    public function setAssociationName($associationName)
    {
        $this->associationName = $associationName;

        return $this;
    }

    /**
     * @return Collection|NodeEvent[]
     */
    public function getNodeEvents()
    {
        return $this->nodes;
    }

    public function addNodeEvent(NodeEvent $nodeEvent)
    {
        if (!$this->nodes->contains($nodeEvent)) {
            $this->nodes[] = $nodeEvent;
            $nodeEvent->setEventConfig($this);
        }

        return $this;
    }


    /**
     * @return Collection|ConnectorEvent[]
     */
    public function getConnectorEvents()
    {
        return $this->conectors;
    }

    public function addConnectorEvent(ConnectorEvent $conectors)
    {
        if (!$this->conectors->contains($conectors)) {
            $this->conectors[] = $conectors;
            $conectors->setEventConfig($this);
        }

        return $this;
    }



}
