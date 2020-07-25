<?php


namespace VeloBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Disponibility
 *
 * @ORM\Table(name="disponibility")
 * @ORM\Entity(repositoryClass="VeloBundle\Repository\DisponibilityRepository")
 */
class Disponibility
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
     * @ORM\ManyToOne(targetEntity="VeloBundle\Entity\Volonteer", inversedBy="disponibility")
     * @ORM\JoinColumn(name="dispo_id", referencedColumnName="id")
     */
    private $volunteer;

    /**
     * @var date
     *
     * @ORM\Column(name="start", type="date")
     */
    private $date;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;

    /**
     * @return mixed
     */
    public function getVolunteer()
    {
        return $this->volunteer;
    }

    /**
     * @param mixed $volunteer
     */
    public function setVolunteer($volunteer)
    {
        $this->volunteer = $volunteer;
    }

    /**
     * @return mixed
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * @param mixed $date
     */
    public function setDate($date)
    {
        $this->date = $date;
    }

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param string $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }



}