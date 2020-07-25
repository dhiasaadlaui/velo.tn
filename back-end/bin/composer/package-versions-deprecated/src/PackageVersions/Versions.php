<?php

declare(strict_types=1);

namespace PackageVersions;

use OutOfBoundsException;

/**
 * This class is generated by composer/package-versions-deprecated, specifically by
 * @see \PackageVersions\Installer
 *
 * This file is overwritten at every run of `composer install` or `composer update`.
 */
final class Versions
{
    const ROOT_PACKAGE_NAME = '__root__';
    /**
     * Array of all available composer packages.
     * Dont read this array from your calling code, but use the \PackageVersions\Versions::getVersion() method instead.
     *
     * @var array<string, string>
     * @internal
     */
    const VERSIONS          = array (
  'composer/package-versions-deprecated' => '1.8.1@b9805885293f3957ee0dd42616ac6915c4ac9a4b',
  'doctrine/annotations' => '1.10.3@5db60a4969eba0e0c197a19c077780aadbc43c5d',
  'doctrine/cache' => '1.10.2@13e3381b25847283a91948d04640543941309727',
  'doctrine/collections' => '1.6.6@5f0470363ff042d0057006ae7acabc5d7b5252d5',
  'doctrine/common' => '2.13.3@f3812c026e557892c34ef37f6ab808a6b567da7f',
  'doctrine/dbal' => '2.10.2@aab745e7b6b2de3b47019da81e7225e14dcfdac8',
  'doctrine/doctrine-bundle' => '2.1.0@0fb513842c78b43770597ef3c487cdf79d944db3',
  'doctrine/doctrine-migrations-bundle' => '2.1.2@856437e8de96a70233e1f0cc2352fc8dd15a899d',
  'doctrine/event-manager' => '1.1.0@629572819973f13486371cb611386eb17851e85c',
  'doctrine/inflector' => '1.4.3@4650c8b30c753a76bf44fb2ed00117d6f367490c',
  'doctrine/instantiator' => '1.3.1@f350df0268e904597e3bd9c4685c53e0e333feea',
  'doctrine/lexer' => '1.2.1@e864bbf5904cb8f5bb334f99209b48018522f042',
  'doctrine/migrations' => '2.2.1@a3987131febeb0e9acb3c47ab0df0af004588934',
  'doctrine/orm' => 'v2.7.3@d95e03ba660d50d785a9925f41927fef0ee553cf',
  'doctrine/persistence' => '1.3.7@0af483f91bada1c9ded6c2cfd26ab7d5ab2094e0',
  'doctrine/reflection' => '1.2.1@55e71912dfcd824b2fdd16f2d9afe15684cfce79',
  'doctrine/sql-formatter' => '1.1.0@5458bdcf176f6a53292e3f0cc73f292d6302fb0f',
  'friendsofsymfony/rest-bundle' => '3.0.1@90583fb3da8f9817fe213c77045f9807d10e987a',
  'nelmio/cors-bundle' => '2.0.1@9683e6d30d000ef998919261329d825de7c53499',
  'nikic/php-parser' => 'v4.6.0@c346bbfafe2ff60680258b631afb730d186ed864',
  'ocramius/proxy-manager' => '2.2.3@4d154742e31c35137d5374c998e8f86b54db2e2f',
  'phpdocumentor/reflection-common' => '2.2.0@1d01c49d4ed62f25aa84a747ad35d5a16924662b',
  'phpdocumentor/reflection-docblock' => '5.1.0@cd72d394ca794d3466a3b2fc09d5a6c1dc86b47e',
  'phpdocumentor/type-resolver' => '1.3.0@e878a14a65245fbe78f8080eba03b47c3b705651',
  'psr/cache' => '1.0.1@d11b50ad223250cf17b86e38383413f5a6764bf8',
  'psr/container' => '1.0.0@b7ce3b176482dbbc1245ebf52b181af44c2cf55f',
  'psr/event-dispatcher' => '1.0.0@dbefd12671e8a14ec7f180cab83036ed26714bb0',
  'psr/log' => '1.1.3@0f73288fd15629204f9d42b7055f72dacbe811fc',
  'symfony/cache' => 'v5.1.2@787eb05e137ad74fa5e51857b9884719760c7b2f',
  'symfony/cache-contracts' => 'v2.1.3@9771a09d2e6b84ecb8c9f0a7dbc72ee92aeba009',
  'symfony/config' => 'v5.1.2@b8623ef3d99fe62a34baf7a111b576216965f880',
  'symfony/console' => 'v5.1.2@34ac555a3627e324b660e318daa07572e1140123',
  'symfony/dependency-injection' => 'v5.1.2@6508423eded583fc07e88a0172803e1a62f0310c',
  'symfony/deprecation-contracts' => 'v2.1.3@5e20b83385a77593259c9f8beb2c43cd03b2ac14',
  'symfony/doctrine-bridge' => 'v5.1.2@997377af37ae96565bf2aea127fb2b6285cd0d51',
  'symfony/dotenv' => 'v5.1.2@42d2a18597f4c7cafc0e25b1ad6a1cbb4f2caf05',
  'symfony/error-handler' => 'v5.1.2@7d0b927b9d3dc41d7d46cda38cbfcd20cdcbb896',
  'symfony/event-dispatcher' => 'v5.1.2@cc0d059e2e997e79ca34125a52f3e33de4424ac7',
  'symfony/event-dispatcher-contracts' => 'v2.1.3@f6f613d74cfc5a623fc36294d3451eb7fa5a042b',
  'symfony/filesystem' => 'v5.1.2@6e4320f06d5f2cce0d96530162491f4465179157',
  'symfony/finder' => 'v5.1.2@4298870062bfc667cb78d2b379be4bf5dec5f187',
  'symfony/flex' => 'v1.8.4@7df5a72c7664baab629ec33de7890e9e3996b51b',
  'symfony/framework-bundle' => 'v5.1.2@d9a85deaa9c7a10df087d86f6a689eb5d4db0abc',
  'symfony/http-foundation' => 'v5.1.2@f93055171b847915225bd5b0a5792888419d8d75',
  'symfony/http-kernel' => 'v5.1.2@a18c27ace1ef344ffcb129a5b089bad7643b387a',
  'symfony/inflector' => 'v5.1.2@fddb4262dd136b34db993a2a3488713df91e4856',
  'symfony/maker-bundle' => 'v1.19.1@51c48ca9df84c16ed522a7781866900edf7c99f8',
  'symfony/orm-pack' => 'v1.1.0@7dd2ed9ba6d7af79f90bdc77522605d40463e533',
  'symfony/polyfill-intl-grapheme' => 'v1.17.1@6e4dbcf5e81eba86e36731f94fe56b1726835846',
  'symfony/polyfill-intl-normalizer' => 'v1.17.1@40309d1700e8f72447bb9e7b54af756eeea35620',
  'symfony/polyfill-mbstring' => 'v1.17.1@7110338d81ce1cbc3e273136e4574663627037a7',
  'symfony/polyfill-php73' => 'v1.17.1@fa0837fe02d617d31fbb25f990655861bb27bd1a',
  'symfony/polyfill-php80' => 'v1.17.1@4a5b6bba3259902e386eb80dd1956181ee90b5b2',
  'symfony/property-access' => 'v5.1.2@638b96246da68810484a5a46ff397e9326f42afc',
  'symfony/property-info' => 'v5.1.2@75d79faca45092829b55eb83f73068e34c6567c5',
  'symfony/routing' => 'v5.1.2@bbd0ba121d623f66d165a55a108008968911f3eb',
  'symfony/security-core' => 'v5.1.2@7414e45f720dd81879bd9a74f152ec92e91d36b6',
  'symfony/serializer' => 'v5.1.2@d1151fc0fd64b613f2a7012afc22d36b1341a5fd',
  'symfony/serializer-pack' => 'v1.0.3@9bbce72dcad0cca797b678d3bfb764cf923ab28a',
  'symfony/service-contracts' => 'v2.1.3@58c7475e5457c5492c26cc740cc0ad7464be9442',
  'symfony/stopwatch' => 'v5.1.2@0f7c58cf81dbb5dd67d423a89d577524a2ec0323',
  'symfony/string' => 'v5.1.2@ac70459db781108db7c6d8981dd31ce0e29e3298',
  'symfony/translation-contracts' => 'v2.1.3@616a9773c853097607cf9dd6577d5b143ffdcd63',
  'symfony/validator' => 'v5.1.2@5e80f314a2faff6fb97942526e27c528b10acdb8',
  'symfony/var-dumper' => 'v5.1.2@46a942903059b0b05e601f00eb64179e05578c0f',
  'symfony/var-exporter' => 'v5.1.2@eabaabfe1485ca955c5b53307eade15ccda57a15',
  'symfony/yaml' => 'v5.1.2@ea342353a3ef4f453809acc4ebc55382231d4d23',
  'webmozart/assert' => '1.9.1@bafc69caeb4d49c39fd0779086c03a3738cbb389',
  'willdurand/jsonp-callback-validator' => 'v1.1.0@1a7d388bb521959e612ef50c5c7b1691b097e909',
  'willdurand/negotiation' => 'v2.3.1@03436ededa67c6e83b9b12defac15384cb399dc9',
  'zendframework/zend-code' => '3.4.1@268040548f92c2bfcba164421c1add2ba43abaaa',
  'zendframework/zend-eventmanager' => '3.2.1@a5e2583a211f73604691586b8406ff7296a946dd',
  'beberlei/assert' => 'v2.9.9@124317de301b7c91d5fce34c98bba2c6925bec95',
  'behat/behat' => 'v3.7.0@08052f739619a9e9f62f457a67302f0715e6dd13',
  'behat/gherkin' => 'v4.6.2@51ac4500c4dc30cbaaabcd2f25694299df666a31',
  'behat/transliterator' => 'v1.3.0@3c4ec1d77c3d05caa1f0bf8fb3aae4845005c7fc',
  'firebase/php-jwt' => 'v5.2.0@feb0e820b8436873675fd3aca04f3728eb2185cb',
  'guzzlehttp/guzzle' => '6.5.5@9d4290de1cfd701f38099ef7e183b64b4b7b0c5e',
  'guzzlehttp/promises' => 'v1.3.1@a59da6cf61d80060647ff4d3eb2c03a2bc694646',
  'guzzlehttp/psr7' => '1.6.1@239400de7a173fe9901b9ac7c06497751f00727a',
  'imbo/behat-api-extension' => 'v2.3.1@ca5247a4742c0eecb155a57cdf677e104a50e273',
  'psr/http-message' => '1.0.1@f6561bf28d520154e4b0ec72be95418abe6d9363',
  'ralouphie/getallheaders' => '3.0.3@120b605dfeb996808c31b6477290a714d356e822',
  'symfony/polyfill-intl-idn' => 'v1.17.1@a57f8161502549a742a63c09f0a604997bf47027',
  'symfony/process' => 'v5.1.2@7f6378c1fa2147eeb1b4c385856ce9de0d46ebd1',
  'symfony/translation' => 'v5.1.2@d387f07d4c15f9c09439cf3f13ddbe0b2c5e8be2',
  'symfony/web-server-bundle' => 'v4.4.10@d617765de8a65d4d42f1b2843c7df36645936216',
  'paragonie/random_compat' => '2.*@176023eaca416f8acb70eba22b56a7c0f45d3c45',
  'symfony/polyfill-ctype' => '*@176023eaca416f8acb70eba22b56a7c0f45d3c45',
  'symfony/polyfill-iconv' => '*@176023eaca416f8acb70eba22b56a7c0f45d3c45',
  'symfony/polyfill-php72' => '*@176023eaca416f8acb70eba22b56a7c0f45d3c45',
  'symfony/polyfill-php71' => '*@176023eaca416f8acb70eba22b56a7c0f45d3c45',
  'symfony/polyfill-php70' => '*@176023eaca416f8acb70eba22b56a7c0f45d3c45',
  'symfony/polyfill-php56' => '*@176023eaca416f8acb70eba22b56a7c0f45d3c45',
  '__root__' => 'dev-master@176023eaca416f8acb70eba22b56a7c0f45d3c45',
);

    private function __construct()
    {
    }

    /**
     * @throws OutOfBoundsException If a version cannot be located.
     *
     * @psalm-param key-of<self::VERSIONS> $packageName
     * @psalm-pure
     */
    public static function getVersion(string $packageName) : string
    {
        if (isset(self::VERSIONS[$packageName])) {
            return self::VERSIONS[$packageName];
        }

        throw new OutOfBoundsException(
            'Required package "' . $packageName . '" is not installed: check your ./vendor/composer/installed.json and/or ./composer.lock files'
        );
    }
}