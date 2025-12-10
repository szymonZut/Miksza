<?php

/** @var \App\Model\Gry $gry */
/** @var \App\Service\Router $router */

$title = 'Dodaj nową grę';
$bodyClass = "edit";

ob_start(); ?>
    <h1><?= htmlspecialchars($title) ?></h1>

    <form action="<?= $router->generatePath('gry-create') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="gry-create">
    </form>

    <a href="<?= $router->generatePath('gry-index') ?>">Powrót do listy</a>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
