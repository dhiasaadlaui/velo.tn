<?php


namespace VeloBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Type;

/**
 * Assignation
 *
 * @ORM\Table(name="assignation")
 * @ORM\Entity(repositoryClass="VeloBundle\Repository\AssignationRepository")
 */
class Assignation
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
     * @var integer
     *
     * @ORM\Column(name="userid", type="integer")
     */
    private $user;

    /**
     * @ORM\OneToOne(targetEntity="VeloBundle\Entity\Claim", cascade={"remove"})
     * @ORM\JoinColumn(name="claimid", referencedColumnName="id" , )
     * @Type("VeloBundle\Entity\Claim")
     */
    private $claim;

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
     * @return int
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param int $user
     */
    public function setUser($user)
    {
        $this->user = $user;
    }

    /**
     * @return int
     */
    public function getClaim()
    {
        return $this->claim;
    }

    /**
     * @param int $claim
     */
    public function setClaim($claim)
    {
        $this->claim = $claim;
    }





}