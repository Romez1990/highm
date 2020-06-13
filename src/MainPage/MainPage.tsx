import React, { useState, ChangeEvent, Fragment } from 'react';
import { useRouter } from 'next/router';
import { Option, isNone } from 'fp-ts/lib/Option';
import {
  makeStyles,
  createStyles,
  Theme,
  Container,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  Typography,
  Button,
  Divider,
} from '@material-ui/core';
import { absurd } from 'fp-ts/lib/function';
import { MainLayout } from '../Layout';
import { useProfileStore } from '../Store/Root';
import { Profile, ProfileType } from '../Profile';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    instructionParagraph: {
      '&:not(:last-child)': {
        marginBottom: spacing(2),
      },
    },
  }),
);

type UserType = ProfileType | 'none';

interface Panel {
  id: number;
  title: string;
  text: JSX.Element | JSX.Element[];
  actions: Action[];
  displaysFor: UserType[];
}

interface Action {
  text: string;

  action(): void;
}

function MainPage(): JSX.Element {
  const { profile } = useProfileStore();

  function getProfileType(profile_: Option<Profile>): UserType {
    if (isNone(profile_)) return 'none';
    return profile_.value.type;
  }

  const type = getProfileType(profile);

  function registrationInstruction(
    user: string,
    superior: string,
  ): JSX.Element {
    return (
      <Fragment>
        Для того, чтобы зарегистрироваться {user}, необходимо сначала получить у
        {superior} регистрационный код, затем перейти на страницу регистрации,
        ввести регистрационный код, имя, фамилию и нажать кнопку
        &quot;Далее&quot;. Потом ввести адрес своей электронной почты, придумать
        пароль, повторить его и нажать кнопку &quot;Зарегистрироваться&quot;. На
        указанную электронную почту придёт письмо с подтверждением. В письме
        необходимо нажать кнопку &quot;Активировать аккаунт&quot; и после этого
        можно будет войти в свой аккаунт на странице входа с помощью указанного
        адреса электронной почты и пароля.
      </Fragment>
    );
  }

  const registrationActions: Action[] = [
    {
      text: 'Войти',
      action(): void {
        router.push('/login');
      },
    },
    {
      text: 'Зарегистрироваться',
      action(): void {
        router.push('/registration');
      },
    },
  ];

  const router = useRouter();

  const panels: Panel[] = [
    {
      id: 1,
      title: 'Инструкция для регистрации студента',
      text: registrationInstruction('студенту', 'преподавателя'),
      actions: registrationActions,
      displaysFor: ['admin', 'teacher', 'none'],
    },
    {
      id: 2,
      title: 'Инструкция для регистрации преподавателя',
      text: registrationInstruction('преподавателю', 'администратора'),
      actions: registrationActions,
      displaysFor: ['admin', 'none'],
    },
    {
      id: 3,
      title: 'Инструкция для студента',
      text: (
        <Fragment>
          У студента есть возможность выполнять практические работы. Для этого
          необходимо перейти на страницу практических работ. На этой странице
          отображается список практических работ, их номер и тема. После нажатия
          на одну из работ осуществляется переход на станицу практической
          работы. Тут представлена тема практической работы, её цели и набор
          заданий. Каждое задание имеет текст, дополнительные данные и поля для
          внесения ответов. Необходимо выполнить все задания и вписать ответы в
          соответствующие поля, после чего нажать кнопку &quot;Проверить&quot;.
          Осуществится отправка и проверка ответов. Далее будет показан
          результат, который включает в себя оценку, количество баллов за всю
          работу и по каждому заданию в отдельности. Если оценка 2, то студенту
          предоставляется возможность ещё раз пройти практическую работу с теми
          же заданиями, пока оценка не будет удовлетворительной. Далее эти
          результаты сможет увидеть преподаватель.
        </Fragment>
      ),
      actions: [
        {
          text: 'Практические работы',
          action(): void {
            router.push('/lessons');
          },
        },
      ],
      displaysFor: ['admin', 'teacher', 'student'],
    },
    {
      id: 4,
      title: 'Инструкция для преподавателя',
      text: [
        <Fragment>
          У преподавателя есть возможность создавать группы и аккаунты её
          студентов. Для этого необходимо перейти на страницу групп, в правом
          верхнем углу таблицы нажать кнопку &quot;Добавить&quot;, вписать
          название группы, ввести список студентов, которые обучаются в данной
          группе и нажать кнопку &quot;Добавить&quot;. В списке появится
          созданная группа, при нажатии на которую осуществится переход на
          страницу группы, где можно увидеть список всех студентов, добавить
          нового, изменить данные существующих, а также удалить студентов. При
          добавлении новый участник помечается как незарегистрированный, если
          нажать кнопку &quot;Регистрационные коды&quot; в правом верхнем углу
          таблицы, то можно посмотреть список всех незарегистрированных
          студентов и их регистрационные коды. Также имеется кнопка для печати
          таблицы регистрационных кодов или сохранения таблицы как PDF файла.
          Эти регистрационные коды необходимо передать студентам для того, чтобы
          они смогли зарегистрироваться. После того, как студент
          зарегистрирован, он исчезает из списка регистрационных кодов и
          помечается как зарегистрированный. Группы разграничиваются между
          преподавателями. Они не могут видеть группы, созданные другим
          преподавателем, а также изменять состав студентов группы.
        </Fragment>,
        <Fragment>
          Также у преподавателя есть возможность просматривать результаты
          выполнения практических работ студентами своих групп. Для этого
          необходимо перейти в панель преподавателя. Далее выбрать группу,
          результаты которой надо посмотреть и выбрать из списка практическую
          работу, по которой необходимо посмотреть результаты. Появится таблица
          студентов со статусом выполнения работы (сдано, не сдано) и оценкой,
          если она есть. Имеется фильтр для статуса и оценки, при помощи
          которого можно отфильтровать список студентов по необходимому статусу
          выполнения работы или по желаемой оценке. При выделении строчки с
          помощью маркера на левом конце строки можно удалить результаты
          выполнения работы, нажав кнопку &quot;Удалить&quot; в правом верхнем
          углу. При нажатии на саму строку раскрывается дополнительная
          информация о результате выполнения работы, это порядковый номер
          студента, количество набранных им баллов за всю работу и по каждому
          заданию.
        </Fragment>,
      ],
      actions: [
        {
          text: 'Группы',
          action(): void {
            router.push('/groups');
          },
        },
        {
          text: 'Панель преподавателя',
          action(): void {
            router.push('/teacher-panel/groups');
          },
        },
      ],
      displaysFor: ['admin', 'teacher'],
    },
    {
      id: 5,
      title: 'Инструкция для администратора',
      text: [
        <Fragment>
          У администратора есть возможность создавать аккаунты преподавателей.
          Для создания необходимо перейти на страницу преподавателей и в правом
          верхнем углу таблицы нажать кнопку &quot;Добавить&quot;, вписать имя
          преподавателя и нажать кнопку &quot;Добавить&quot;. В списке появится
          запись о созданном аккаунте преподавателя. В списке преподавателей
          также можно изменить данные существующих преподавателей и удалить их.
          При добавлении нового преподавателя он помечается как
          незарегистрированный и если нажать кнопку &quot;Регистрационные
          коды&quot; в правом верхнем углу таблицы, то можно посмотреть список
          всех незарегистрированных преподавателей и их регистрационные коды.
          Также имеется кнопка для печати таблицы регистрационных кодов или
          сохранения таблицы как PDF файла. Этот регистрационный код необходимо
          передать преподавателю для того, чтобы он смог зарегистрироваться.
          После того, как преподаватель зарегистрирован, он исчезает из списка
          регистрационных кодов и помечается как зарегистрированный.
        </Fragment>,
        <Fragment>
          Также у администратора есть доступ к базе данных, где он может
          производить любые манипуляции с хранящимися данными.
        </Fragment>,
        <Fragment>
          Для того, чтобы поменять пользователю пароль, необходимо в консоли
          Django получить объект модели необходимого пользователя и вызвать у
          него метод .set_password(password) и передать ему необходимый пароль и
          затем вызвать метод .save() для сохранения в базе.
        </Fragment>,
        <Fragment>
          Для смены адреса электронной почты необходимо это сделать напрямую в
          базе данных. В таблице auth_user у необходимого пользователя заменить
          поле email, а также в таблице account_emailaddress в строке с
          соответствующим user_id заменить поле email.
        </Fragment>,
        <Fragment>
          Остальные таблицы базы данных в ручной модификации не нуждаются, так
          как имеют доступ из панели администратора.
        </Fragment>,
      ],
      actions: [
        {
          text: 'Преподаватели',
          action(): void {
            router.push('/teachers');
          },
        },
      ],
      displaysFor: ['admin'],
    },
  ];

  const [activePanel, setActivePanel] = useState<number | undefined>(() => {
    if (type === 'admin') return 5;
    if (type === 'teacher') return 4;
    if (type === 'student') return 3;
    if (type === 'none') return undefined;
    return absurd(type);
  });

  const handlePanelToggle = (panelId: number) => (
    _: ChangeEvent<unknown>,
    isExpanded: boolean,
  ): void => {
    setActivePanel(isExpanded ? panelId : undefined);
  };

  const classes = useStyles();

  return (
    <MainLayout title="Main page">
      <Container maxWidth="sm">
        {panels
          .filter(panel => panel.displaysFor.includes(type))
          .map(panel => (
            <ExpansionPanel
              key={panel.id}
              expanded={activePanel === panel.id}
              onChange={handlePanelToggle(panel.id)}
            >
              <ExpansionPanelSummary>
                <Typography component="h3" variant="h6">
                  {panel.title}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  {!Array.isArray(panel.text) ? (
                    <Typography align="justify">{panel.text}</Typography>
                  ) : (
                    panel.text.map((text, textIndex) => (
                      /* eslint-disable react/no-array-index-key */
                      <Typography
                        key={textIndex}
                        className={classes.instructionParagraph}
                        align="justify"
                      >
                        {text}
                      </Typography>
                    ))
                  )}
                </div>
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
                {panel.actions.map((action, actionIndex, actions) => {
                  const lastAction = actionIndex === actions.length - 1;
                  return (
                    <Button
                      key={action.text}
                      color={lastAction ? 'primary' : undefined}
                      onClick={action.action}
                    >
                      {action.text}
                    </Button>
                  );
                })}
              </ExpansionPanelActions>
            </ExpansionPanel>
          ))}
      </Container>
    </MainLayout>
  );
}

export default MainPage;
