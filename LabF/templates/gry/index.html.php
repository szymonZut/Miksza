<?php

/** @var \App\Model\Gry[] $gry */
/** @var \App\Service\Router $router */

$title = 'Gry List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Lista Gier</h1>

    <a href="<?= $router->generatePath('gry-create') ?>">Dodaj nową grę</a>

    <ul class="index-list">
        <?php foreach ($gry as $gra): ?>
            <li>
                <h3><?= htmlspecialchars($gra->getSubject()) ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('gry-show', ['id' => $gra->getId()]) ?>">Szczegóły</a></li>
                    <li><a href="<?= $router->generatePath('gry-edit', ['id' => $gra->getId()]) ?>">Edytuj</a></li>
                    <li><a href="<?= $router->generatePath('gry-delete', ['id' => $gra->getId()]) ?>">Usuń</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
