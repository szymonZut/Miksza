<?php
namespace App\Controller;

use App\Model\Gry;
use App\Service\Router;
use App\Service\Templating;
use App\Exception\NotFoundException;

class GryController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $gry = Gry::findAll();
        return $templating->render('gry/index.html.php', [
            'gry' => $gry,
            'router' => $router,
        ]);
    }

    public function createAction(?array $requestGry, Templating $templating, Router $router): ?string
    {
        if ($requestGry) {
            $gra = Gry::fromArray($requestGry);
            $gra->save();

            $router->redirect($router->generatePath('gry-index'));
            return null;
        }

        return $templating->render('gry/create.html.php', [
            'gry' => new Gry(),
            'router' => $router,
        ]);
    }

    public function editAction(int $id, ?array $requestGry, Templating $templating, Router $router): ?string
    {
        $gra = Gry::find($id);
        if (!$gra) {
            throw new NotFoundException("Nie znaleziono gry o ID $id");
        }

        if ($requestGry) {
            $gra->fill($requestGry);
            $gra->save();

            $router->redirect($router->generatePath('gry-index'));
            return null;
        }

        return $templating->render('gry/edit.html.php', [
            'gry' => $gra,
            'router' => $router,
        ]);
    }

    public function showAction(int $id, Templating $templating, Router $router): ?string
    {
        $gra = Gry::find($id);
        if (!$gra) {
            throw new NotFoundException("Nie znaleziono gry o ID $id");
        }

        return $templating->render('gry/show.html.php', [
            'gry' => $gra,
            'router' => $router,
        ]);
    }

    public function deleteAction(int $id, Router $router): ?string
    {
        $gra = Gry::find($id);
        if (!$gra) {
            throw new NotFoundException("Nie znaleziono gry o ID $id");
        }

        $gra->delete();

        $router->redirect($router->generatePath('gry-index'));
        return null;
    }
}