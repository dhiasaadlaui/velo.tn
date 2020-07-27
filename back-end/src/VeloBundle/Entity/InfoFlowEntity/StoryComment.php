<?php

namespace VeloBundle\Entity\InfoFlowEntity;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Type;

/**
 * @ORM\Table(name="story_comment")
 * @ORM\Entity(repositoryClass="VeloBundle\Repository\InfoFlowEntity\StoryCommentRepository")
 */

class StoryComment
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
     * @ORM\Column(name="content", type="string", length=255)

     */
    private $content;

    /**
     * @var string
     * @ORM\Column(name="username", type="string", length=255)

     */
    private $username;

    /**
     *
     * @ORM\ManyToOne(targetEntity="VeloBundle\Entity\InfoFlowEntity\Story"  )
     * @ORM\JoinColumn(name="story_id", referencedColumnName="id")
     * @Type("VeloBundle\Entity\InfoFlowEntity\Story")
     */
    private $story;

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
     * Set content
     *
     * @param string $content
     *
     * @return StoryComment
     */
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get content
     *
     * @return string
     */
    public function getContent()
    {
        return $this->content;
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
     * @param string $username
     *
     * @return string
     */
    public function setUsername($username)
    {
        $this->username = $username;
    }

    /**
     * @return mixed
     */
    public function getStory()
    {
        return $this->story;
    }

    /**
     * @param mixed $story
     */
    public function setStory($story)
    {
        $this->story = $story;
    }
}

