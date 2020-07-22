<?php

namespace VeloBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Product
 *
 * @ORM\Table(name="product")
 * @ORM\Entity(repositoryClass="VeloBundle\Repository\ProductRepository")
 */
class Product
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
     * @ORM\Column(name="prdname", type="string", length=255)
     */
    private $prdname;

    /**
     * @var int
     *
     * @ORM\Column(name="number", type="integer")
     */
    private $number;


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
     * Set prdname
     *
     * @param string $prdname
     *
     * @return Product
     */
    public function setPrdname($prdname)
    {
        $this->prdname = $prdname;

        return $this;
    }

    /**
     * Get prdname
     *
     * @return string
     */
    public function getPrdname()
    {
        return $this->prdname;
    }

    /**
     * Set number
     *
     * @param integer $number
     *
     * @return Product
     */
    public function setNumber($number)
    {
        $this->number = $number;

        return $this;
    }

    /**
     * Get number
     *
     * @return int
     */
    public function getNumber()
    {
        return $this->number;
    }
}

