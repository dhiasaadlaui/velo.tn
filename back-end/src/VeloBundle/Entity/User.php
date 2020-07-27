<?php

namespace VeloBundle\Entity;


use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * User
 *
 * @ORM\Table(name="user")
 * @ORM\Entity(repositoryClass="VeloBundle\Repository\UserRepository")
 * @ORM\InheritanceType("SINGLE_TABLE")
 * @ORM\DiscriminatorColumn(name="discr", type="string")
 * @ORM\DiscriminatorMap({"user" = "User", "volonteer" = "Volonteer"})
 */
class User
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    protected $name;

    /**
     * @var string
     *
     * @ORM\Column(name="forname", type="string", length=255)
     */
    protected $forname;

    /**
     * @var int
     *
     * @ORM\Column(name="age", type="integer")
     */
    protected $age;

    /**
     * @var string
     *
     * @ORM\Column(name="login", type="string", length=255,unique=true , nullable=false)
     */
    protected $login;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", length=255, nullable=false)
     */
    protected $password;

    /**
     * @var string
     *
     * @ORM\Column(name="ismoderator", type="boolean", length=255)
     */
    protected $ismoderator;

    /**
     * @var Collection
     * @ORM\OneToMany(targetEntity="VeloBundle\Entity\Claim", mappedBy="user")
     *
     */
    protected $claim;

    /**
     * @var \Doctrine\Common\Collections\Collection|\VeloBundle\Entity\Event[]
     *
     * @ORM\ManyToMany(targetEntity="VeloBundle\Entity\Event", inversedBy="subscribers", fetch="LAZY")
     * @ORM\JoinTable(
     *  name="user_event",
     *  joinColumns={
     *      @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     *  },
     *  inverseJoinColumns={
     *      @ORM\JoinColumn(name="event_id", referencedColumnName="id")
     *  }
     * )
     */
    protected $subscribedEvents;


    public function __construct() {
        $this->claim = new ArrayCollection();
        $this->subscribedEvents = new ArrayCollection();
    }

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
     * Set name
     *
     * @param string $name
     *
     * @return User
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set forname
     *
     * @param string $forname
     *
     * @return User
     */
    public function setForname($forname)
    {
        $this->forname = $forname;

        return $this;
    }

    /**
     * Get forname
     *
     * @return string
     */
    public function getForname()
    {
        return $this->forname;
    }

    /**
     * Set age
     *
     * @param integer $age
     *
     * @return User
     */
    public function setAge($age)
    {
        $this->age = $age;

        return $this;
    }

    /**
     * Get age
     *
     * @return int
     */
    public function getAge()
    {
        return $this->age;
    }

    /**
     * Set login
     *
     * @param string $login
     *
     * @return User
     */
    public function setLogin($login)
    {
        $this->login = $login;

        return $this;
    }

    /**
     * Get login
     *
     * @return string
     */
    public function getLogin()
    {
        return $this->login;
    }

    /**
     * Set password
     *
     * @param string $password
     *
     * @return User
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set ismoderator
     *
     * @param string $ismoderator
     *
     * @return User
     */
    public function setIsmoderator($ismoderator)
    {
        $this->ismoderator = $ismoderator;

        return $this;
    }

    /**
     * Get ismoderator
     *
     * @return string
     */
    public function getIsmoderator()
    {
        return $this->ismoderator;
    }

    /**
     * @return Collection
     */
    public function getClaim()
    {
        return $this->claim;
    }

    /**
     * @param mixed $claim
     */
    public function setClaim($claim)
    {
        $this->claim = $claim;
    }
    /**
     * @return Collection|\VeloBundle\Entity\Event[]
     */
    public function getSubscribedEvents()
    {
        return $this->subscribedEvents;
    }

    public function addSubscribedEvent(\VeloBundle\Entity\Event $subscribedEvent)
    {
        if (!$this->subscribedEvents->contains($subscribedEvent)) {
            $this->subscribedEvents[] = $subscribedEvent;
        }

        return $this;
    }


    public function removeSubscribedEvent(\VeloBundle\Entity\Event $subscribedEvent)
    {
        if ($this->subscribedEvents->contains($subscribedEvent)) {
            $this->subscribedEvents->removeElement($subscribedEvent);
        }

        return $this;
    }

}

