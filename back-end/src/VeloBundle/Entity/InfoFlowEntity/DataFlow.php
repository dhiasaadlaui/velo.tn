<?php

namespace VeloBundle\Entity\InfoFlowEntity;

use Doctrine\ORM\Mapping as ORM;

/**
 * DataFlow
 *
 * @ORM\Table(name="info_flow_entity_data_flow")
 * @ORM\Entity(repositoryClass="VeloBundle\Repository\InfoFlowEntity\DataFlowRepository")
 */
class DataFlow
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
     * @var string
     *
     * @ORM\Column(name="username", type="string", unique=true, length=255)
     */
    private $username;

    /**
     * @var int
     *
     * @ORM\Column(name="likes", type="integer")
     */
    private $likes;

    /**
     * @var int
     *
     * @ORM\Column(name="reports", type="integer")
     */
    private $reports;

    /**
     * @var int
     *
     * @ORM\Column(name="points", type="integer")
     */
    private $points;

    /**
     * @var int
     *
     * @ORM\Column(name="commends", type="integer")
     */
    private $commends;

    /**
     * @var int
     *
     * @ORM\Column(name="events", type="integer")
     */
    private $events;

    /**
     * @var int
     *
     * @ORM\Column(name="riderescue", type="integer")
     */
    private $riderescue;

    /**
     * @var int
     *
     * @ORM\Column(name="parkiteer", type="integer")
     */
    private $parkiteer;

    /**
     * @var int
     *
     * @ORM\Column(name="marktplace", type="integer")
     */
    private $marktplace;

    /**
     * @var int
     *
     * @ORM\Column(name="stories", type="integer")
     */
    private $stories;


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
     * Set username
     *
     * @param string $username
     *
     * @return DataFlow
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get username
     *
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set likes
     *
     * @param integer $likes
     *
     * @return DataFlow
     */
    public function setLikes($likes)
    {
        $this->likes = $likes;

        return $this;
    }

    /**
     * Get likes
     *
     * @return int
     */
    public function getLikes()
    {
        return $this->likes;
    }

    /**
     * Set reports
     *
     * @param integer $reports
     *
     * @return DataFlow
     */
    public function setReports($reports)
    {
        $this->reports = $reports;

        return $this;
    }

    /**
     * Get reports
     *
     * @return int
     */
    public function getReports()
    {
        return $this->reports;
    }

    /**
     * Set points
     *
     * @param integer $points
     *
     * @return DataFlow
     */
    public function setPoints($points)
    {
        $this->points = $points;

        return $this;
    }

    /**
     * Get points
     *
     * @return int
     */
    public function getPoints()
    {
        return $this->points;
    }

    /**
     * Set commends
     *
     * @param integer $commends
     *
     * @return DataFlow
     */
    public function setCommends($commends)
    {
        $this->commends = $commends;

        return $this;
    }

    /**
     * Get commends
     *
     * @return int
     */
    public function getCommends()
    {
        return $this->commends;
    }

    /**
     * Set events
     *
     * @param integer $events
     *
     * @return DataFlow
     */
    public function setEvents($events)
    {
        $this->events = $events;

        return $this;
    }

    /**
     * Get events
     *
     * @return int
     */
    public function getEvents()
    {
        return $this->events;
    }

    /**
     * Set riderescue
     *
     * @param integer $riderescue
     *
     * @return DataFlow
     */
    public function setRiderescue($riderescue)
    {
        $this->riderescue = $riderescue;

        return $this;
    }

    /**
     * Get riderescue
     *
     * @return int
     */
    public function getRiderescue()
    {
        return $this->riderescue;
    }

    /**
     * Set parkiteer
     *
     * @param int $parkiteer
     *
     * @return DataFlow
     */
    public function setParkiteer($parkiteer)
    {
        $this->parkiteer = $parkiteer;

        return $this;
    }

    /**
     * Get parkiteer
     *
     * @return int
     */
    public function getParkiteer()
    {
        return $this->parkiteer;
    }

    /**
     * Set marktplace
     *
     * @param integer $marktplace
     *
     * @return DataFlow
     */
    public function setMarktplace($marktplace)
    {
        $this->marktplace = $marktplace;

        return $this;
    }

    /**
     * Get marktplace
     *
     * @return int
     */
    public function getMarktplace()
    {
        return $this->marktplace;
    }

    /**
     * Set stories
     *
     * @param integer $stories
     *
     * @return DataFlow
     */
    public function setStories($stories)
    {
        $this->stories = $stories;

        return $this;
    }

    /**
     * Get stories
     *
     * @return int
     */
    public function getStories()
    {
        return $this->stories;
    }
}

