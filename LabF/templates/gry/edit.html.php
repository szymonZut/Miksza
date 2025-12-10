<?php

/** @var \App\Model\Gry $gry */
/** @var \App\Service\Router $router */

$title = "Edytuj grę: {$gry->getSubject()} ({$gry->getId()})";
$bodyClass = "edit";

ob_start(); ?>
    <h1><?= htmlspecialchars($title) ?></h1>

    <form action="<?= $router->generatePath('gry-edit') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="gry-edit">
        <input type="hidden" name="id" value="<?= $gry->getId() ?>">
    </form>

    <ul class="action-list">
        <li>
            <a href="<?= $router->generatePath('gry-index') ?>">Powrót do listy</a>
        </li>
        <li>
            <form action="<?= $router->generatePath('gry-delete') ?>" method="post">
                <input type="submit" value="Usuń" onclick="return confirm('Czy na pewno chcesz usunąć?')">
                <input type="hidden" name="action" value="gry-delete">
                <input type="hidden" name="id" value="<?= $gry->getId() ?>">
            </form>
        </li>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
