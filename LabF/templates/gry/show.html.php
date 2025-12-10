<?php

/** @var \App\Model\Gry $gry */
/** @var \App\Service\Router $router */

$title = "{$gry->getSubject()} ({$gry->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= htmlspecialchars($gry->getSubject()) ?></h1>

    <article>
        <?= nl2br(htmlspecialchars($gry->getContent())) ?>
    </article>

    <ul class="action-list">
        <li><a href="<?= $router->generatePath('gry-index') ?>">Powrót do listy</a></li>
        <li><a href="<?= $router->generatePath('gry-edit', ['id'=> $gry->getId()]) ?>">Edytuj</a></li>
        <li><a href="<?= $router->generatePath('gry-delete', ['id'=> $gry->getId()]) ?>">Usuń</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';